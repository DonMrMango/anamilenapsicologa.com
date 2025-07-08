'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    TikTok?: {
      embed: {
        load: () => void
      }
    }
    onTikTokEmbedLoad?: () => void
  }
}

interface TiktokEmbedProps {
  url: string
  caption?: string
}

export default function TiktokEmbed({ url, caption }: TiktokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract video ID from TikTok URL
  const getVideoId = (url: string): string | null => {
    const regex = /video\/(\d+)|@[\w.]+\/video\/(\d+)/
    const match = url.match(regex)
    
    if (match) {
      return match[1] || match[2] || null
    }
    
    return null
  }

  const videoId = getVideoId(url)
  
  useEffect(() => {
    // This will run when the TikTok embed script loads
    const loadTikTokWidget = () => {
      if (window.TikTok && containerRef.current) {
        window.TikTok.embed.load()
      }
    }

    // Add a global callback that TikTok can call
    window.onTikTokEmbedLoad = loadTikTokWidget

    return () => {
      // @ts-ignore
      window.onTikTokEmbedLoad = null
    }
  }, [url])

  if (!videoId) {
    return (
      <div className="rounded-lg bg-neutral-100 p-4 text-center text-neutral-500">
        No se pudo cargar el video de TikTok
      </div>
    )
  }

  return (
    <div className="tiktok-embed-container">
      <Script 
        src="https://www.tiktok.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore
          if (window.TikTok) {
            // @ts-ignore
            window.TikTok.embed.load()
          }
        }}
      />

      <div ref={containerRef} className="flex justify-center">
        <blockquote 
          className="tiktok-embed rounded-xl overflow-hidden shadow-sm" 
          cite={url}
          data-video-id={videoId}
          style={{ maxWidth: '605px' }}
        >
          <section></section>
        </blockquote>
      </div>

      {caption && (
        <div className="mt-3 text-sm text-neutral-700">
          {caption}
        </div>
      )}
    </div>
  )
}