"use client"

import { useState, useRef } from "react"
import { Plus, Home, MessageSquare, Leaf, User, X, Droplets, Scissors, Sparkles, Sun, Cloud, CloudRain, CloudSnow, ChevronLeft, ImagePlus } from "lucide-react"

// ============== 类型定义 ==============
interface DiaryEntry {
  id: string
  date: string
  note: string
  images: string[]
  tags: string[]
}

interface Plant {
  id: string
  name: string
  image: string
  addedDate: string
  nextWateringDays: number
  entries: DiaryEntry[]
}

type WeatherType = "晴" | "多云" | "雨" | "雪"

// ============== API 接口（预留数据库接入） ==============
const PlantAPI = {
  // 获取所有植物
  async getPlants(): Promise<Plant[]> {
    // TODO: 替换为实际 API 调用
    // return await fetch('/api/plants').then(res => res.json())
    return initialPlants
  },

  // 获取单个植物
  async getPlant(id: string): Promise<Plant | null> {
    // TODO: 替换为实际 API 调用
    // return await fetch(`/api/plants/${id}`).then(res => res.json())
    return initialPlants.find(p => p.id === id) || null
  },

  // 添加日记条目
  async addEntry(plantId: string, entry: Omit<DiaryEntry, "id">): Promise<DiaryEntry> {
    // TODO: 替换为实际 API 调用
    // return await fetch(`/api/plants/${plantId}/entries`, {
    //   method: 'POST',
    //   body: JSON.stringify(entry)
    // }).then(res => res.json())
    return { ...entry, id: Date.now().toString() }
  },

  // 删除日记条目
  async deleteEntry(plantId: string, entryId: string): Promise<boolean> {
    // TODO: 替换为实际 API 调用
    // return await fetch(`/api/plants/${plantId}/entries/${entryId}`, {
    //   method: 'DELETE'
    // }).then(res => res.ok)
    return true
  },

  // 上传图片
  async uploadImage(file: File): Promise<string> {
    // TODO: 替换为实际图片上传 API
    // const formData = new FormData()
    // formData.append('file', file)
    // const res = await fetch('/api/upload', { method: 'POST', body: formData })
    // const data = await res.json()
    // return data.url
    return URL.createObjectURL(file)
  },

  // 获取天气
  async getWeather(): Promise<{ type: WeatherType; tempLow: number; tempHigh: number }> {
    // TODO: 替换为实际天气 API
    // return await fetch('/api/weather').then(res => res.json())
    return { type: "晴", tempLow: 6, tempHigh: 15 }
  }
}

// ============== 初始数据 ==============
const initialPlants: Plant[] = [
  {
    id: "1",
    name: "龟背竹",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&h=200&fit=crop",
    addedDate: "2025年11月1日",
    nextWateringDays: 2,
    entries: [
      {
        id: "1",
        date: "2025年11月8日",
        note: "今天叶子变黄了一点。",
        images: [
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1632321089780-a65afae5c3f0?w=150&h=150&fit=crop",
        ],
        tags: ["浇水", "施肥"],
      },
      {
        id: "2",
        date: "2025年11月15日",
        note: "叶子变大了。",
        images: [
          "https://images.unsplash.com/photo-1632321089780-a65afae5c3f0?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=150&h=150&fit=crop",
        ],
        tags: ["浇水", "剪枝"],
      },
      {
        id: "3",
        date: "2025年11月16日",
        note: "今天没什么变化。",
        images: [
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=150&h=150&fit=crop",
          "https://images.unsplash.com/photo-1632321089780-a65afae5c3f0?w=150&h=150&fit=crop",
        ],
        tags: ["浇水"],
      },
    ],
  },
  {
    id: "2",
    name: "绿萝",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=200&h=200&fit=crop",
    addedDate: "2025年10月15日",
    nextWateringDays: 1,
    entries: [
      {
        id: "4",
        date: "2025年11月10日",
        note: "长出了新芽。",
        images: [
          "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=150&h=150&fit=crop",
        ],
        tags: ["浇水"],
      },
    ],
  },
  {
    id: "3",
    name: "多肉",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200&h=200&fit=crop",
    addedDate: "2025年9月20日",
    nextWateringDays: 5,
    entries: [],
  },
]

// ============== 天气组件 ==============
function WeatherWidget() {
  const weather: WeatherType = "晴"
  const tempLow = 6
  const tempHigh = 15

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm mx-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-green-700 bg-white/60 px-3 py-1 rounded-lg">
          {weather}
        </span>
        <span className="text-green-600 font-medium">
          {tempLow}°C-{tempHigh}°C
        </span>
      </div>
      <div className="relative">
        <div className="relative">
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">&#x263A;</span>
            </div>
          </div>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-yellow-400 rounded-full" />
          <div className="absolute -top-0.5 left-2 w-1 h-2 bg-yellow-400 rounded-full rotate-[-30deg]" />
          <div className="absolute -top-0.5 right-2 w-1 h-2 bg-yellow-400 rounded-full rotate-[30deg]" />
        </div>
        <div className="absolute -bottom-1 -left-3 w-10 h-5 bg-white rounded-full opacity-90" />
        <div className="absolute -bottom-2 -left-1 w-8 h-4 bg-white rounded-full opacity-90" />
      </div>
    </div>
  )
}

// ============== 植物卡片轮播 ==============
function PlantCarousel({
  plants,
  currentIndex,
  onIndexChange,
}: {
  plants: Plant[]
  currentIndex: number
  onIndexChange: (index: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startXRef.current
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (dragOffset > 50 && currentIndex > 0) {
      onIndexChange(currentIndex - 1)
    } else if (dragOffset < -50 && currentIndex < plants.length - 1) {
      onIndexChange(currentIndex + 1)
    }
    setDragOffset(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startXRef.current
    setDragOffset(diff)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (dragOffset > 50 && currentIndex > 0) {
      onIndexChange(currentIndex - 1)
    } else if (dragOffset < -50 && currentIndex < plants.length - 1) {
      onIndexChange(currentIndex + 1)
    }
    setDragOffset(0)
  }

  const currentPlant = plants[currentIndex]

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 overflow-hidden">
      {/* 指示点 */}
      <div className="flex justify-center gap-1.5 mb-4">
        {plants.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndexChange(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? "bg-orange-400" : "bg-orange-200"
            }`}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex items-start gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(${dragOffset}px)`,
          }}
        >
          <img
            src={currentPlant.image}
            alt={currentPlant.name}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            draggable={false}
          />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{currentPlant.name}</h2>
            <p className="text-gray-600 text-sm">
              添加时间：<span className="text-green-600 font-medium">{currentPlant.addedDate}</span>
            </p>
            <p className="text-gray-600 text-sm">
              距离下次浇水还有：<span className="text-green-600 font-medium">{currentPlant.nextWateringDays}天</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============== 标签组件 ==============
function Tag({ label }: { label: string }) {
  const getTagColor = () => {
    switch (label) {
      case "浇水":
        return "bg-green-100 text-green-700 border-green-300"
      case "施肥":
        return "bg-amber-50 text-amber-700 border-amber-300"
      case "剪枝":
        return "bg-orange-50 text-orange-700 border-orange-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getTagColor()}`}>
      {label}
    </span>
  )
}

// ============== 可滑动删除的时间线条目 ==============
function SwipeableEntry({
  entry,
  onDelete,
}: {
  entry: DiaryEntry
  onDelete: (id: string) => void
}) {
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const currentXRef = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startXRef.current
    const newTranslate = Math.min(0, Math.max(-100, currentXRef.current + diff))
    setTranslateX(newTranslate)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (translateX < -50) {
      setTranslateX(-80)
    } else {
      setTranslateX(0)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startXRef.current
    const newTranslate = Math.min(0, Math.max(-100, currentXRef.current + diff))
    setTranslateX(newTranslate)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (translateX < -50) {
      setTranslateX(-80)
    } else {
      setTranslateX(0)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg mb-4">
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-red-500 flex items-center justify-center rounded-r-lg">
        <button onClick={() => onDelete(entry.id)} className="text-white p-2">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        className="relative bg-white transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="w-0.5 flex-1 bg-green-200 min-h-[100px]" />
          </div>

          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-gray-700 font-medium">{entry.date}</span>
              <div className="flex gap-2 flex-wrap">
                {entry.tags.map((tag, idx) => (
                  <Tag key={idx} label={tag} />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-3">{entry.note}</p>
            <div className="flex gap-2 flex-wrap">
              {entry.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`植物照片 ${idx + 1}`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============== 全屏添加日记页面 ==============
function AddEntryPage({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (entry: Omit<DiaryEntry, "id">) => void
}) {
  const [note, setNote] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const availableTags = ["浇水", "施肥", "剪枝"]

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // 使用 API 上传图片
      const imageUrl = await PlantAPI.uploadImage(file)
      setImages((prev) => [...prev, imageUrl])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const today = new Date()
    const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
    onAdd({
      date: dateStr,
      note: note || "记录了一下植物的状态。",
      images: images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=150&h=150&fit=crop",
      ],
      tags: selectedTags.length > 0 ? selectedTags : ["浇水"],
    })
    setNote("")
    setSelectedTags([])
    setImages([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col max-w-md mx-auto bg-gradient-to-b from-green-50 to-amber-50/30">
      {/* 头部 */}
      <header className="flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">添加日记</h1>
        <span className="text-green-600 italic font-medium">Diary</span>
      </header>

      {/* 内容区 */}
      <main className="flex-1 overflow-auto p-4">
        {/* 文本输入区域 */}
        <div className="relative mb-6">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
            {/* 装饰性植物叶子 */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-green-600">
              <path
                fill="currentColor"
                d="M50 10 C30 30 20 60 50 90 C80 60 70 30 50 10"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M60 20 C45 35 40 55 60 80 C80 55 75 35 60 20"
                opacity="0.3"
              />
            </svg>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`点击输入文本~\n可以在这里记录植物发生的变化哦~`}
            className="w-full h-64 p-4 bg-green-50/50 rounded-2xl border-0 resize-none focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* 养护操作 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            养护操作
          </label>
          <div className="flex gap-2 flex-wrap">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
                }`}
              >
                {tag === "浇水" && <Droplets className="w-4 h-4" />}
                {tag === "施肥" && <Sparkles className="w-4 h-4" />}
                {tag === "剪枝" && <Scissors className="w-4 h-4" />}
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 图片上传区域 */}
        <div className="mb-6">
          <div className="flex gap-3 flex-wrap">
            {/* 已上传的图片 */}
            {images.map((img, idx) => (
              <div key={idx} className="relative w-28 h-28">
                <img
                  src={img}
                  alt={`上传图片 ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* 添加图片按钮 */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-green-400 hover:bg-green-50/50 transition-colors"
            >
              <Plus className="w-8 h-8 text-gray-400" />
              <span className="text-xs text-gray-500">点击添加植物照片</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="flex justify-end items-end h-24 opacity-60">
          <svg viewBox="0 0 200 80" className="w-48">
            {/* 花盆1 */}
            <rect x="20" y="50" width="30" height="25" rx="3" fill="#d97706" />
            <rect x="18" y="45" width="34" height="8" rx="2" fill="#b45309" />
            <path d="M35 45 C35 30 25 20 35 10 C45 20 35 30 35 45" fill="#22c55e" />
            <path d="M35 45 C35 35 45 25 35 15" stroke="#16a34a" strokeWidth="1" fill="none" />

            {/* 花盆2 */}
            <rect x="80" y="55" width="25" height="20" rx="3" fill="#ea580c" />
            <rect x="78" y="50" width="29" height="7" rx="2" fill="#c2410c" />
            <ellipse cx="92" cy="45" rx="8" ry="6" fill="#22c55e" />
            <ellipse cx="88" cy="42" rx="6" ry="5" fill="#16a34a" />
            <ellipse cx="96" cy="42" rx="6" ry="5" fill="#16a34a" />

            {/* 花盆3 */}
            <rect x="130" y="50" width="28" height="25" rx="3" fill="#f59e0b" />
            <rect x="128" y="45" width="32" height="7" rx="2" fill="#d97706" />
            <path d="M144 45 C144 35 135 30 144 15 C153 30 144 35 144 45" fill="#4ade80" />
            <path d="M140 45 C140 38 132 33 140 22" fill="#22c55e" />
            <path d="M148 45 C148 38 156 33 148 22" fill="#22c55e" />
          </svg>
        </div>
      </main>

      {/* 完成按钮 */}
      <div className="p-4 pb-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-medium text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30"
        >
          完成
        </button>
      </div>
    </div>
  )
}

// ============== 主页面 ==============
export default function PlantDiary() {
  const [plants, setPlants] = useState<Plant[]>(initialPlants)
  const [currentPlantIndex, setCurrentPlantIndex] = useState(0)
  const [isAddPageOpen, setIsAddPageOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(2)

  const currentPlant = plants[currentPlantIndex]

  const handleDeleteEntry = async (id: string) => {
    // 调用 API 删除
    await PlantAPI.deleteEntry(currentPlant.id, id)
    
    setPlants((prev) =>
      prev.map((p, idx) =>
        idx === currentPlantIndex
          ? { ...p, entries: p.entries.filter((e) => e.id !== id) }
          : p
      )
    )
  }

  const handleAddEntry = async (entry: Omit<DiaryEntry, "id">) => {
    // 调用 API 添加
    const newEntry = await PlantAPI.addEntry(currentPlant.id, entry)
    
    setPlants((prev) =>
      prev.map((p, idx) =>
        idx === currentPlantIndex
          ? { ...p, entries: [newEntry, ...p.entries] }
          : p
      )
    )
  }

  const tabs = [
    { icon: Home, label: "首页" },
    { icon: MessageSquare, label: "消息" },
    { icon: Leaf, label: "植物" },
    { icon: User, label: "我的" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col max-w-md mx-auto">
      {/* 头部 */}
      <header className="bg-green-200/60 pt-12 pb-4 px-4">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          植物日记<span className="text-lg font-normal italic text-green-600 ml-2">Diary</span>
        </h1>
        <WeatherWidget />
      </header>

      {/* 主内容区 */}
      <main className="flex-1 px-4 py-6 overflow-auto pb-24">
        {/* 植物卡片轮播 */}
        <PlantCarousel
          plants={plants}
          currentIndex={currentPlantIndex}
          onIndexChange={setCurrentPlantIndex}
        />

        {/* 时间线 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {currentPlant.entries.length > 0 ? (
            currentPlant.entries.map((entry) => (
              <SwipeableEntry
                key={entry.id}
                entry={entry}
                onDelete={handleDeleteEntry}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Leaf className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>暂无日记记录</p>
              <p className="text-sm">点击右下角 + 添加第一条记录</p>
            </div>
          )}
        </div>
      </main>

      {/* 添加按钮 */}
      <button
        onClick={() => setIsAddPageOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors active:scale-95 z-40"
      >
        <Plus className="w-8 h-8 text-white" />
      </button>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4 max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center p-2 transition-colors ${
                activeTab === index ? "text-green-500" : "text-gray-400"
              }`}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 全屏添加日记页面 */}
      <AddEntryPage
        isOpen={isAddPageOpen}
        onClose={() => setIsAddPageOpen(false)}
        onAdd={handleAddEntry}
      />
    </div>
  )
}
