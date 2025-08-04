"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Key, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Privacy & Terms Section */}
      <section className="flex-1 py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Key className="h-8 w-8 text-white" />
              </div>
              <Terminal className="h-12 w-12 text-slate-400" />
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Privacy & Terms</h1>
            <p className="text-slate-600 md:text-lg max-w-2xl mx-auto">
              Our commitment to decentralization, privacy, and individual sovereignty
            </p>
          </div>

          {/* Main Content */}
          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-slate max-w-none">
                <div className="text-lg leading-relaxed space-y-6">
                  <p className="text-slate-700">
                    <strong className="text-slate-900">
                      Ligatur does not share your information with any third party programs or software.
                    </strong>{" "}
                    We value decentralization, privacy, and sovereignty.
                  </p>

                  <p className="text-slate-700">
                    As the name implies, Ligatur exists as a <em>platform of connectivity</em>. We envision voluntary
                    association and positive sum relationships maximized through the evolving cryptocurrency community.
                  </p>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
                    <p className="text-slate-700 mb-0">
                      <strong className="text-orange-800">Important:</strong> Respective agreements between property
                      owners and potential buyers or tenants are the responsibility of the individuals involved.
                    </p>
                  </div>

                  <div className="border-t pt-8 mt-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Shield className="h-6 w-6 text-orange-500" />
                      Our Core Principles
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <Key className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                        <h3 className="font-semibold text-slate-900 mb-2">Privacy First</h3>
                        <p className="text-sm text-slate-600">Your data remains yours. No third-party sharing, ever.</p>
                      </div>

                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <Terminal className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                        <h3 className="font-semibold text-slate-900 mb-2">Decentralized</h3>
                        <p className="text-sm text-slate-600">
                          Built on principles of decentralization and user control.
                        </p>
                      </div>

                      <div className="text-center p-6 bg-slate-50 rounded-lg">
                        <Shield className="h-8 w-8 mx-auto mb-3 text-green-500" />
                        <h3 className="font-semibold text-slate-900 mb-2">Individual Sovereignty</h3>
                        <p className="text-sm text-slate-600">You control your transactions and relationships.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-8 mt-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Platform Responsibility</h2>
                    <p className="text-slate-700">
                      Ligatur serves as a connection platform between property owners and potential buyers or renters.
                      We facilitate discovery and communication, but all agreements, negotiations, and transactions are
                      conducted directly between the involved parties.
                    </p>

                    <p className="text-slate-700 mt-4">
                      Users are encouraged to conduct their own due diligence, verify property details independently,
                      and seek appropriate legal and financial advice when entering into real estate transactions.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                    <p className="text-blue-800 text-sm mb-0">
                      <strong>Questions about our privacy practices?</strong> Contact us at{" "}
                      <a href="mailto:nevutel@proton.me" className="text-blue-600 hover:underline">
                        nevutel@proton.me
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-600">© 2025 Ligatur. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/contact">
            Contact Us
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/privacy">
            Privacy & Terms
          </Link>
        </nav>
      </footer>
    </div>
  )
}
