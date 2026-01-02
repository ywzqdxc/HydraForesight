import { Header } from "@/components/header"
import PublicReports from "@/components/public-reports"

export default function PublicReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">公众参与平台</h1>
            <p className="text-muted-foreground">查看和提交降水和积水情况的公众上报信息</p>
          </div>
          <PublicReports />
        </div>
      </main>
    </div>
  )
}
