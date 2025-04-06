"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
// This file handles Spotify API integration

import { auth } from "./auth"

// Spotify API endpoints
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "http://localhost:3000/api/auth/callback/spotify"
const CLIENT_ID = "5f23da7a99704051a329b3d3e9bc7df2" // User will need to add their Spotify Client ID
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-library-read",
]

// Check if token exists and is valid
// export const hasValidSpotifyToken = (): boolean => {
//   if (typeof window === "undefined") return false // Add browser check
//   const token = getSpotifyToken()
//   if (!token) return false

//   // Tokens expire after 1 hour, we'll consider it expired after 50 minutes
//   const timestamp = localStorage.getItem("spotify_token_timestamp")
//   if (!timestamp) return false

//   const tokenAge = Date.now() - parseInt(timestamp)
//   const MAX_TOKEN_AGE = 50 * 60 * 1000 // 50 minutes in milliseconds

//   return tokenAge < MAX_TOKEN_AGE
// }

interface SpotifyArtist {
  name: string
}

interface SpotifyAlbum {
  images: { url: string }[]
}

interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  preview_url: string | null
  uri: string
  duration_ms: number
  album: SpotifyAlbum
}
interface SpotifyTrackItem {
  track: SpotifyTrack | null
}

interface AppTrack {
  id: string
  title: string
  artist: string
  url: string
  spotifyId: string
  duration: number
  albumArt?: string
}

// Fetch user's playlists
export const fetchUserPlaylists = async (): Promise<any[]> => {
  const session = await auth()
  const token = session?.accessToken
  if (!token) throw new Error("No Spotify token available")

  console.log("Fetching playlists with token:", token.substring(0, 5) + "...")

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Playlist fetch error:", response.status, errorText)
      throw new Error(
        `Failed to fetch playlists: ${response.status} ${errorText}`
      )
    }

    const data = await response.json()
    console.log(`Retrieved ${data.items?.length || 0} playlists`)
    return data.items || []
  } catch (error) {
    console.error("Error in fetchUserPlaylists:", error)
    throw error
  }
}

// Fetch tracks from a playlist
export const fetchPlaylistTracks = async (
  playlistId: string
): Promise<SpotifyTrackItem[]> => {
  const session = await auth()
  const token = session?.accessToken
  if (!token) throw new Error("No Spotify token available")

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Track fetch error:", response.status, errorText)
      throw new Error(
        `Failed to fetch playlist tracks: ${response.status} ${errorText}`
      )
    }

    const data = await response.json()
    console.log(`Retrieved ${data.items?.length || 0} tracks from playlist`)
    return data.items || []
  } catch (error) {
    console.error("Error in fetchPlaylistTracks:", error)
    throw error
  }
}
export async function fetchPlayerNext(deviceId: string | null) {
  const session = await auth()
  const token = session?.accessToken
  if (!token) throw new Error("No Spotify token available")

  if (!deviceId) {
    console.error("Device ID não disponível")
    return
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      console.error(
        "Erro ao mudar para a próxima faixa:",
        await response.text()
      )
    } else {
      console.log("Música alterada para a próxima faixa!")
    }
  } catch (error) {
    console.error("Erro ao mudar de música:", error)
  }
}
// Função convertida para async com tratamento de erros
export async function convertSpotifyTracksToAppFormat(
  spotifyTracks: SpotifyTrackItem[]
): Promise<AppTrack[]> {
  try {
    const conversionResult = await Promise.all(
      spotifyTracks.map(async (item) => {
        const track = item.track

        // Validação em etapas
        if (!track) {
          throw new TrackConversionError("Item da trilha é nulo")
        }

        // if (!track.preview_url || !track.uri) {
        //   return null
        // }

        if (!track.album?.images?.[0]?.url) {
          console.warn(`Album art não encontrada para track: ${track.id}`)
        }

        return {
          id: track.id,
          title: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          url: track.uri ?? track.preview_url,
          spotifyId: track.id,
          duration: track.duration_ms,
          albumArt: track.album.images[0]?.url,
        }
      })
    )

    const convertedTracks = conversionResult.filter(Boolean) as AppTrack[]
    const skippedCount = spotifyTracks.length - convertedTracks.length

    console.log(
      `Conversão completa: ${convertedTracks.length} tracks válidas, ${skippedCount} ignoradas`
    )

    return convertedTracks
  } catch (error) {
    console.error("Erro na conversão de tracks:", error)

    if (error instanceof TrackConversionError) {
      throw new Error("Falha na conversão de formato: " + error.message)
    }

    throw new Error("Erro desconhecido durante a conversão de tracks")
  }
}

// Adicione isto no topo do arquivo para tipos de erro personalizados
class TrackConversionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TrackConversionError"
  }
}
