import { Header } from "@/components/header"
import PublicReports from "@/components/public-reports"

export default function PublicReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6">
        <PublicReports />
      </main>
    </div>
  )
}
