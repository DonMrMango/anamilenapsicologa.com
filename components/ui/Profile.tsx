'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'

interface ProfileProps {
  name: string
  bio: string
  profileImage: string
  coverImage?: string
  postCount: number
  videoCount: number
  social?: {
    instagram?: string
    facebook?: string
    tiktok?: string
    whatsapp?: string
  }
}

export default function Profile({
  name,
  bio,
  profileImage,
  coverImage,
  postCount,
  videoCount,
  social
}: ProfileProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative w-full h-40 md:h-60 bg-gradient-to-r from-primary-light to-primary">
        {coverImage && (
          <Image
            src={coverImage}
            alt={`Portada de ${name}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="relative px-4 pb-4 pt-14 md:px-8 md:pb-6">
        {/* Profile Image */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-neutral-100">
          <Image
            src={profileImage || '/images/default-avatar.png'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* Name and Stats */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-serif font-bold text-neutral-800">{name}</h1>
          
          <div className="flex justify-center gap-6 mt-2 text-sm text-neutral-600">
            <div>
              <span className="font-semibold">{postCount}</span> publicaciones
            </div>
            <div>
              <span className="font-semibold">{videoCount}</span> videos
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-center text-neutral-700 mb-4">{bio}</p>

        {/* Social Links */}
        {social && (
          <div className="flex justify-center gap-3 mb-4">
            {social.instagram && (
              <a 
                href={social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white transition-colors"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {social.facebook && (
              <a 
                href={social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white transition-colors"
              >
                <FaFacebook size={18} />
              </a>
            )}
            {social.tiktok && (
              <a 
                href={social.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary hover:text-white transition-colors"
              >
                <FaTiktok size={18} />
              </a>
            )}
            {social.whatsapp && (
              <a 
                href={`https://wa.me/${social.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-green-500 hover:text-white transition-colors"
              >
                <FaWhatsapp size={18} />
              </a>
            )}
          </div>
        )}

        {/* Contact Button */}
        <div className="flex justify-center">
          <button 
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            onClick={() => window.open('https://wa.me/573216404797?text=Hola Ana, encontré tu perfil y me gustaría contactarte.')}
          >
            Contactar
          </button>
        </div>
      </div>
    </div>
  )
}