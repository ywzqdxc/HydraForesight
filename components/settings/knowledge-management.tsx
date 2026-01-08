"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Download } from "lucide-react"
import FloodGuideManagement from "./flood-guide-management"
import ResourceManagement from "./resource-management"

export default function KnowledgeManagement() {
  const [activeTab, setActiveTab] = useState("guides")

  useEffect(() => {
    console.log("[v0] 知识科普管理组件已加载")
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">水雨知识科普管理</h2>
        <p className="text-muted-foreground">管理防汛指南和资源下载</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            防汛指南管理
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            资源下载管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="mt-6">
          <FloodGuideManagement />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ResourceManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
