"use client"

import { TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MarketIntelligenceProps {
  propertyPrice: number
  currency: string
  location: string
  propertyType: string
  className?: string
}

interface MarketData {
  priceHistory: Array<{ date: string; price: number }>
  priceChange: number
  marketTrend: 'up' | 'down' | 'stable'
  averagePrice: number
  pricePerSqft: number
  daysOnMarket: number
  competitiveListings: number
  investmentMetrics: {
    expectedROI: number
    rentalYield: number
    appreciation: number
  }
  marketPrediction: {
    nextMonth: number
    nextQuarter: number
    nextYear: number
  }
}

export function MarketIntelligence({ 
  propertyPrice, 
  currency, 
  location, 
  propertyType, 
  className 
}: MarketIntelligenceProps) {
  // Mock market data - in real implementation, this would come from market APIs
  const marketData: MarketData = {
    priceHistory: [
      { date: '2024-01', price: propertyPrice * 0.85 },
      { date: '2024-02', price: propertyPrice * 0.88 },
      { date: '2024-03', price: propertyPrice * 0.92 },
      { date: '2024-04', price: propertyPrice * 0.95 },
      { date: '2024-05', price: propertyPrice * 0.98 },
      { date: '2024-06', price: propertyPrice }
    ],
    priceChange: 8.5,
    marketTrend: 'up',
    averagePrice: propertyPrice * 0.92,
    pricePerSqft: propertyPrice / 1800, // Assuming 1800 sqft
    daysOnMarket: 45,
    competitiveListings: 12,
    investmentMetrics: {
      expectedROI: 12.5,
      rentalYield: 4.8,
      appreciation: 8.2
    },
    marketPrediction: {
      nextMonth: 2.1,
      nextQuarter: 5.8,
      nextYear: 12.3
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-slate-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <div className={className}>
      {/* Market Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {propertyPrice.toFixed(1)} {currency}
              </p>
              <p className="text-sm text-slate-600">This Property</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <BarChart3 className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-600">
                {marketData.averagePrice.toFixed(1)} {currency}
              </p>
              <p className="text-sm text-slate-600">Market Average</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {marketData.pricePerSqft.toFixed(3)} {currency}
              </p>
              <p className="text-sm text-slate-600">Per Sq Ft</p>
            </div>
          </div>

          {/* Market Trend */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              {getTrendIcon(marketData.marketTrend)}
              <div>
                <p className="font-medium">6-Month Price Change</p>
                <p className="text-sm text-slate-600">{location} {propertyType} market</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xl font-bold ${getTrendColor(marketData.marketTrend)}`}>
                +{marketData.priceChange}%
              </p>
              <Badge variant={marketData.marketTrend === 'up' ? 'default' : 'destructive'}>
                {marketData.marketTrend === 'up' ? 'Rising' : 'Declining'}
              </Badge>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Days on Market</span>
                <span className="text-lg font-bold">{marketData.daysOnMarket}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">Average for this area</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Competitive Listings</span>
                <span className="text-lg font-bold">{marketData.competitiveListings}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">Similar properties nearby</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Metrics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Investment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {marketData.investmentMetrics.expectedROI}%
              </p>
              <p className="text-sm text-slate-600">Expected ROI</p>
              <p className="text-xs text-slate-500 mt-1">Annual return</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {marketData.investmentMetrics.rentalYield}%
              </p>
              <p className="text-sm text-slate-600">Rental Yield</p>
              <p className="text-xs text-slate-500 mt-1">Annual rental income</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {marketData.investmentMetrics.appreciation}%
              </p>
              <p className="text-sm text-slate-600">Appreciation</p>
              <p className="text-xs text-slate-500 mt-1">Yearly growth rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Market Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="font-medium">Next Month</span>
              <span className="text-green-600 font-bold">+{marketData.marketPrediction.nextMonth}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="font-medium">Next Quarter</span>
              <span className="text-green-600 font-bold">+{marketData.marketPrediction.nextQuarter}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="font-medium">Next Year</span>
              <span className="text-green-600 font-bold">+{marketData.marketPrediction.nextYear}%</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>AI Insight:</strong> This property is in a high-growth area with strong fundamentals. 
              Market trends suggest continued appreciation driven by infrastructure development and population growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
