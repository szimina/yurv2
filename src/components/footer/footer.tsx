import styles from './footer.module.css'
import { Logo, TelegramLogo, WhatsappLogo } from '../ui'

export const Footer = () => (
	<footer className={styles.container} id='header'>
		<div className={styles.content}>
			<div className={styles.innerContainer}>
				<div className={styles.logo}>
					<a href='http://localhost:8080/' className={styles.link}>
						<Logo fill='var(--main-color)' fillOnHover='var(--hover-color)' />
					</a>
				</div>
				<a href='http://localhost:8080/' className={styles.policy}>
					<p>Политика конфиденциальности</p>
				</a>
			</div>
			<div className={styles.innerContainer}>
				<div>
				<a href="tel:+79111005005" className={styles.link}>
          <p className={styles.telephone}>+7 (911) 100-50-05</p>
        </a>
				</div>
				<div className={styles.icon}>
					<a
						href='https://t.me/+79111005005'
						target='_blank'
						className={styles.link}
					>
						<TelegramLogo fill='#c6c6c6' />
					</a>
				</div>
				<div className={styles.icon}>
					<a
						href='https://wa.me/79111005005'
						target='_blank'
						className={styles.link}
					>
						<WhatsappLogo fill='#c6c6c6' />
					</a>
				</div>
			</div>
		</div>
	</footer>
)
