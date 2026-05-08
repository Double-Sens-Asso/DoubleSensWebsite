import styles from './MaintenancePage.module.css'

type MaintenancePageProps = {
  code: string
  logo: string
  logoAlt: string
  message: string
}

export function MaintenancePage({
  code,
  logo,
  logoAlt,
  message,
}: MaintenancePageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <section className={styles.content} aria-labelledby="maintenance-title">
        <img src={logo} alt={logoAlt} className={styles.logo} />

        <h1
          className={styles.errorCode}
          id="maintenance-title"
          aria-label={`Erreur ${code}`}
        >
          <span className={styles.errorCodeMagenta} aria-hidden="true">
            {code}
          </span>
          <span className={styles.errorCodeCyan} aria-hidden="true">
            {code}
          </span>
          <span className={styles.errorCodeValue}>{code}</span>
        </h1>

        <p className={styles.message}>{message}</p>
      </section>
    </main>
  )
}
