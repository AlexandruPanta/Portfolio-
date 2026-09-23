import Link from 'next/link';
import { useRouter } from 'next/router';

/* Bascule FR / EN — pointe vers la MÊME page dans l'autre langue,
   jamais vers l'accueil. `styles` est le module CSS de la page
   appelante (Home ou CaseStudy) : les deux portent les mêmes noms de
   classe (langSwitch/langLink/langActive/langDim), sans dépendance
   croisée entre modules. Ne consomme pas le budget --accent : les deux
   états utilisent --text/--text-dim, jamais --accent. */
export default function LangSwitch({ styles }) {
  const { pathname, query, locale } = useRouter();
  const target = { pathname, query };

  return (
    <p className={styles.langSwitch}>
      <Link
        href={target}
        locale="fr"
        className={locale === 'fr' ? styles.langActive : styles.langDim}
        aria-current={locale === 'fr' ? 'page' : undefined}
      >
        FR
      </Link>
      <span className={styles.langDim} aria-hidden="true">
        {' / '}
      </span>
      <Link
        href={target}
        locale="en"
        className={locale === 'en' ? styles.langActive : styles.langDim}
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
    </p>
  );
}
