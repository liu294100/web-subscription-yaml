"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Zap, ArrowRight, Sparkles, Filter, Link as LinkIcon, Download, Moon, Sun, Lock } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const SERVICES = [
  { key: "netflix", name: "Netflix", icon: "🎬", color: "text-red-500", bg: "bg-red-500/10" },
  { key: "disneyplus", name: "Disney+", icon: "📺", color: "text-blue-500", bg: "bg-blue-500/10" },
  { key: "spotify", name: "Spotify", icon: "🎵", color: "text-green-500", bg: "bg-green-500/10" },
  { key: "youtube", name: "YouTube", icon: "📺", color: "text-red-600", bg: "bg-red-600/10" },
  { key: "tiktok", name: "TikTok", icon: "🎵", color: "text-black dark:text-white", bg: "bg-gray-500/10" },
  { key: "twitch", name: "Twitch", icon: "🎮", color: "text-purple-500", bg: "bg-purple-500/10" },
  { key: "primevideo", name: "Prime Video", icon: "📺", color: "text-blue-400", bg: "bg-blue-400/10" },
  { key: "hbo", name: "HBO Max", icon: "🎭", color: "text-purple-600", bg: "bg-purple-600/10" },
  { key: "openai", name: "OpenAI", icon: "🤖", color: "text-emerald-600", bg: "bg-emerald-600/10" },
  { key: "telegram", name: "Telegram", icon: "✈️", color: "text-sky-500", bg: "bg-sky-500/10" },
  { key: "google", name: "Google", icon: "🔍", color: "text-blue-500", bg: "bg-blue-500/10" },
  { key: "github", name: "GitHub", icon: "🐙", color: "text-gray-800 dark:text-gray-200", bg: "bg-gray-500/10" },
  { key: "apple", name: "Apple", icon: "🍎", color: "text-gray-500", bg: "bg-gray-500/10" },
  { key: "microsoft", name: "Microsoft", icon: "🪟", color: "text-blue-600", bg: "bg-blue-600/10" },
  { key: "steam", name: "Steam", icon: "🎮", color: "text-blue-800 dark:text-blue-400", bg: "bg-blue-800/10" },
  { key: "emby", name: "Emby", icon: "🎬", color: "text-green-600", bg: "bg-green-600/10" },
  { key: "bahamut", name: "Bahamut", icon: "🐉", color: "text-cyan-600", bg: "bg-cyan-600/10" },
  { key: "bilibili", name: "Bilibili", icon: "📺", color: "text-pink-500", bg: "bg-pink-500/10" },
  { key: "linkedin", name: "LinkedIn", icon: "💼", color: "text-blue-700", bg: "bg-blue-700/10" },
  { key: "gov", name: "Foreign Gov", icon: "🏛️", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-600/10" },
  { key: "gfw", name: "GFW List", icon: "🧱", color: "text-red-700 dark:text-red-500", bg: "bg-red-700/10" },
  { key: "foreign_traffic", name: "Foreign Traffic", icon: "🌐", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { key: "foreign_streaming", name: "Foreign Streaming", icon: "🎬", color: "text-rose-500", bg: "bg-rose-500/10" },
]

export default function ClashConverterPage() {
  const [subscriptionUrl, setSubscriptionUrl] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>(SERVICES.map((s) => s.key))
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const [authRequired, setAuthRequired] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [checkingAuth, setCheckingAuth] = useState(true)

  // 避免 hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Check auth
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        setAuthRequired(data.authRequired)
        if (!data.authRequired) {
          setIsAuthenticated(true)
        }
        setCheckingAuth(false)
      })
      .catch(() => setCheckingAuth(false))
  }, [])

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputPassword) return

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ password: inputPassword }),
      })
      const data = await res.json()
      if (data.valid) {
        setIsAuthenticated(true)
        setPassword(inputPassword)
        toast.success("验证成功")
      } else {
        toast.error("密码错误")
      }
    } catch {
      toast.error("验证失败")
    }
  }

  const toggleService = (key: string) => {
    setSelectedServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const selectAll = () => setSelectedServices(SERVICES.map((s) => s.key))
  const selectNone = () => setSelectedServices([])

  const generateUrl = async () => {
    if (!subscriptionUrl) {
      toast.error("请输入订阅地址")
      return
    }

    setIsGenerating(true)
    
    // 模拟加载效果，提升体验
    await new Promise(resolve => setTimeout(resolve, 600))

    const baseUrl = `${window.location.origin}/api/convert`
    const params = new URLSearchParams()
    params.set("url", subscriptionUrl)
    if (password) {
      params.set("pwd", password)
    }

    if (selectedServices.length < SERVICES.length) {
      params.set("services", selectedServices.join(","))
    }

    setGeneratedUrl(`${baseUrl}?${params.toString()}`)
    setIsGenerating(false)
    toast.success("订阅链接已生成！")
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedUrl)
    toast.success("已复制到剪贴板")
  }

  const openUrl = () => {
    window.open(generatedUrl, "_blank")
  }

  if (checkingAuth)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )

  if (authRequired && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 space-y-6 shadow-2xl border-2">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">访问受限</h1>
              <p className="text-muted-foreground">该服务已开启访问控制，请输入密码以继续使用</p>
            </div>
          </div>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="请输入访问密码"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                autoFocus
                className="h-11 text-center text-lg tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-lg font-medium transition-all hover:scale-[1.02]">
              验证密码
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
      
      <div className="fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />

      {/* 主题切换按钮 */}
      <div className="absolute top-4 right-4 z-50">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>

      <main className="container max-w-5xl mx-auto py-16 px-4 space-y-12 relative z-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
            <Zap className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">
            Clash 订阅转换器
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            简单、快速地为你的 Clash 订阅添加流媒体分流规则。支持 Netflix, Disney+, Spotify 等主流服务。
          </p>
        </motion.div>

        {/* 主要内容区域 */}
        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          <div className="space-y-8">
             {/* 1. 输入订阅 */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 border-primary text-primary">1</Badge>
                <h2 className="text-xl font-semibold">输入订阅地址</h2>
              </div>
              <Card className="p-1 border-2 focus-within:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 px-3">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="粘贴你的 Clash 订阅链接 (http://...)"
                    value={subscriptionUrl}
                    onChange={(e) => setSubscriptionUrl(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 text-base py-6"
                  />
                </div>
              </Card>
            </motion.section>

            {/* 2. 选择服务 */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 border-primary text-primary">2</Badge>
                  <h2 className="text-xl font-semibold">选择分流服务</h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={selectAll} className="text-xs h-8">全选</Button>
                  <Button variant="ghost" size="sm" onClick={selectNone} className="text-xs h-8">清空</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service.key)
                  return (
                    <motion.button
                      key={service.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleService(service.key)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-transparent bg-secondary/50 hover:bg-secondary hover:border-border"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 text-primary">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                      )}
                      <div className={cn("text-3xl p-2 rounded-full", service.bg)}>{service.icon}</div>
                      <span className={cn("font-medium text-sm", isSelected ? "text-primary" : "text-muted-foreground")}>
                        {service.name}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.section>
          </div>

          {/* 侧边栏/底部操作区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-6 sticky top-8 border-2 shadow-lg bg-card/50 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                生成结果
              </h3>
              
              <div className="space-y-4">
                <Button 
                  className="w-full h-12 text-lg shadow-lg shadow-primary/20" 
                  onClick={generateUrl}
                  disabled={!subscriptionUrl || isGenerating}
                >
                  {isGenerating ? (
                    <>正在生成...</>
                  ) : (
                    <>
                      生成订阅链接 <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <AnimatePresence>
                  {generatedUrl && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t"
                    >
                      <div className="p-3 bg-muted rounded-lg break-all text-xs font-mono text-muted-foreground border">
                        {generatedUrl}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={copyToClipboard} className="flex-1">
                          <Copy className="mr-2 h-4 w-4" /> 复制
                        </Button>
                        <Button variant="outline" onClick={openUrl} className="flex-1">
                          <Download className="mr-2 h-4 w-4" /> 打开
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-6 border-t text-xs text-muted-foreground">
                <p>提示：生成的链接包含你的原始订阅信息，请勿泄露给他人。</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
