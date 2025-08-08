"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'white' | 'gradient'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const LogoIcon = ({ size = 'md', variant = 'default', className }: LogoProps) => {
  const colorClasses = {
    default: 'text-primary',
    white: 'text-white',
    gradient: 'text-primary'
  }

  return (
    <div className={cn(sizeClasses[size], colorClasses[variant], className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {variant === 'gradient' ? (
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066cc" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
        ) : null}
        
        {/* Modern geometric house design */}
        <g fill={variant === 'gradient' ? 'url(#logoGradient)' : 'currentColor'}>
          {/* Base foundation */}
          <rect x="15" y="75" width="70" height="8" rx="2" />
          
          {/* Main building structure */}
          <path d="M25 70h50c2.8 0 5-2.2 5-5V45c0-1.1-.4-2.1-1.1-2.8L58.1 21.4c-1.5-1.5-4.1-1.5-5.6 0L31.8 42.2c-.7.7-1.1 1.7-1.1 2.8v20c0 2.8 2.2 5 5 5z" />
          
          {/* Roof accent */}
          <path d="M50 15l25 25H25l25-25z" opacity="0.8" />
          
          {/* Window */}
          <rect x="35" y="50" width="12" height="12" rx="2" fill={variant === 'white' ? '#0066cc' : 'white'} />
          
          {/* Door */}
          <rect x="55" y="55" width="8" height="15" rx="1" fill={variant === 'white' ? '#0066cc' : 'white'} />
          <circle cx="61" cy="62" r="1" fill="currentColor" />
          
          {/* Decorative elements */}
          <circle cx="45" cy="30" r="2" opacity="0.6" />
          <circle cx="55" cy="30" r="2" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

interface LogoWithTextProps extends LogoProps {
  showText?: boolean
  textSize?: 'sm' | 'md' | 'lg' | 'xl'
}

const textSizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
}

export const Logo = ({ 
  size = 'md', 
  variant = 'default', 
  showText = true, 
  textSize = 'lg',
  className 
}: LogoWithTextProps) => {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <LogoIcon size={size} variant={variant} />
      {showText && (
        <span className={cn(
          'font-display font-bold tracking-tight',
          textSizeClasses[textSize],
          variant === 'white' ? 'text-white' : variant === 'gradient' ? 'text-shine' : 'text-primary'
        )}>
          Ligatur
        </span>
      )}
    </div>
  )
}

export { LogoIcon }
export default Logo
