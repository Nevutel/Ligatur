"use client"

import { useState, useEffect } from "react"
import { Calculator, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CryptoPriceCalculatorProps {
  propertyPrice: number
  propertyCurrency: string
  className?: string
}

interface CryptoPrice {
  [key: string]: {
    usd: number
  }
}

const CRYPTO_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  TRX: "tron",
  XMR: "monero",
  USDC: "usd-coin",
  USDT: "tether",
}

const CRYPTO_LABELS = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  TRX: "Tron",
  XMR: "Monero",
  USDC: "USD Coin",
  USDT: "Tether",
}

export function CryptoPriceCalculator({ propertyPrice, propertyCurrency, className = "" }: CryptoPriceCalculatorProps) {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC")
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice>({})
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchCryptoPrices = async () => {
    try {
      setLoading(true)
      const coinIds = Object.values(CRYPTO_IDS).join(",")
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_last_updated_at=true`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch crypto prices")
      }

      const data = await response.json()
      setCryptoPrices(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching crypto prices:", error)
      // Fallback to mock prices if API fails
      setCryptoPrices({
        bitcoin: { usd: 43250 },
        ethereum: { usd: 2580 },
        solana: { usd: 98.5 },
        tron: { usd: 0.105 },
        monero: { usd: 158.75 },
        "usd-coin": { usd: 1.0 },
        tether: { usd: 1.0 },
      })
      setLastUpdated(new Date())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoPrices()

    // Update prices every 60 seconds
    const interval = setInterval(fetchCryptoPrices, 60000)
    return () => clearInterval(interval)
  }, [])

  const getPrice = (cryptoSymbol: string): number => {
    const coinId = CRYPTO_IDS[cryptoSymbol as keyof typeof CRYPTO_IDS]
    return cryptoPrices[coinId]?.usd || 0
  }

  // Calculate property price in USD
  const propertyPriceUSD = propertyPrice * getPrice(propertyCurrency)

  // Calculate equivalent in selected crypto
  const selectedCryptoPrice = getPrice(selectedCrypto)
  const cryptoEquivalent = selectedCryptoPrice > 0 ? propertyPriceUSD / selectedCryptoPrice : 0

  const formatCryptoAmount = (amount: number): string => {
    if (amount >= 1) {
      return amount.toFixed(4)
    } else if (amount >= 0.01) {
      return amount.toFixed(6)
    } else {
      return amount.toFixed(8)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-orange-500" />
          Crypto Price Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Property Price */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {propertyPrice} {propertyCurrency}
            </div>
            <div className="text-sm text-slate-600">
              {loading ? "Loading USD value..." : `≈ $${propertyPriceUSD.toLocaleString()} USD`}
            </div>
          </div>
        </div>

        {/* Crypto Converter */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Convert to Cryptocurrency</label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CRYPTO_LABELS).map(([symbol, name]) => (
                  <SelectItem key={symbol} value={symbol}>
                    {name} ({symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading prices...</span>
                </div>
              ) : (
                <>
                  <div className="text-xl font-bold text-blue-800">
                    {formatCryptoAmount(cryptoEquivalent)} {selectedCrypto}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Current {selectedCrypto} price: ${getPrice(selectedCrypto).toLocaleString()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Live Price Status */}
        <div className="text-xs text-slate-500 border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`}></div>
              {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Loading prices..."}
            </div>
            <button
              onClick={fetchCryptoPrices}
              className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
              disabled={loading}
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
          <div className="mt-1">Powered by CoinGecko API</div>
        </div>
      </CardContent>
    </Card>
  )
}
