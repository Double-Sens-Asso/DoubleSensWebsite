import { siteConfig } from '@/config/site'
import { MaintenancePage } from '@/pages/maintenance'

export function App() {
  return (
    <MaintenancePage
      code={siteConfig.maintenance.code}
      logo={siteConfig.logo}
      logoAlt={siteConfig.name}
      message={siteConfig.maintenance.message}
    />
  )
}

export default App
