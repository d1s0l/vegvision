'use client'

import { useState } from "react";
import { BellRing, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import styles from "./SettingsPage.module.scss";

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationState {
  emailAlerts: boolean;
  weeklyDigest: boolean;
  securityAlerts: boolean;
}

const initialPasswordState: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function SettingsPage() {
  const { user, isLoading } = useCurrentUser();

  const [passwordForm, setPasswordForm] = useState(initialPasswordState);
  const [notifications, setNotifications] = useState<NotificationState>({
    emailAlerts: true,
    weeklyDigest: true,
    securityAlerts: true,
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const profileName = isLoading ? "..." : user?.name ?? "Пользователь";
  const profileRole = isLoading ? "Загрузка..." : user?.role ?? "Участник команды";
  const username = isLoading ? "..." : user?.username ?? "username";

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileMessage("Изменения сохранены локально. Подключим API на следующем этапе.");
  };

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage("Заполните новый пароль и подтверждение.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("Новый пароль и подтверждение должны совпадать.");
      return;
    }

    setPasswordForm(initialPasswordState);
    setPasswordMessage("Пароль обновлен локально. Сейчас это демо без отправки на сервер.");
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.badge}>
            <ShieldCheck size={16} />
            Личный кабинет
          </span>
          <h1>Настройки аккаунта</h1>
          <p>
            Здесь можно обновить контактные данные, подготовить смену пароля и
            управлять базовыми уведомлениями. Все действия пока работают как заглушки.
          </p>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.avatar}>{profileName.slice(0, 1)}</div>
          <div>
            <strong>{profileName}</strong>
            <span>{profileRole}</span>
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.sectionHead}>
            <div className={styles.iconWrap}>
              <UserRound size={18} />
            </div>
            <div>
              <p>Профиль</p>
              <h2>Основные данные</h2>
            </div>
          </div>

          <form
            key={user ? `${user.email}-${user.fullName}` : "profile-loading"}
            className={styles.form}
            onSubmit={handleProfileSubmit}
          >
            <label className={styles.field}>
              <span>Почта</span>
              <input
                type="email"
                defaultValue={user?.email ?? ""}
                placeholder="name@example.com"
              />
            </label>

            <label className={styles.field}>
              <span>ФИО</span>
              <input
                type="text"
                defaultValue={user?.fullName ?? ""}
                placeholder="Иванов Иван Иванович"
              />
            </label>

            <div className={styles.readonlyRow}>
              <div>
                <span className={styles.metaLabel}>Логин</span>
                <strong>@{username}</strong>
              </div>
              <div>
                <span className={styles.metaLabel}>Роль</span>
                <strong>{profileRole}</strong>
              </div>
            </div>

            <div className={styles.actionRow}>
              <button type="submit" className={styles.primaryButton}>
                Сохранить изменения
              </button>
              {profileMessage ? <p className={styles.helper}>{profileMessage}</p> : null}
            </div>
          </form>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHead}>
            <div className={styles.iconWrap}>
              <KeyRound size={18} />
            </div>
            <div>
              <p>Безопасность</p>
              <h2>Смена пароля</h2>
            </div>
          </div>

          <form className={styles.form} onSubmit={handlePasswordSubmit}>
            <label className={styles.field}>
              <span>Текущий пароль</span>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value,
                  }))
                }
                placeholder="Введите текущий пароль"
              />
            </label>

            <label className={styles.field}>
              <span>Новый пароль</span>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                placeholder="Минимум 8 символов"
              />
            </label>

            <label className={styles.field}>
              <span>Повторите новый пароль</span>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="Повторите новый пароль"
              />
            </label>

            <div className={styles.actionRow}>
              <button type="submit" className={styles.primaryButton}>
                Обновить пароль
              </button>
              {passwordMessage ? <p className={styles.helper}>{passwordMessage}</p> : null}
            </div>
          </form>
        </section>
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.sectionHead}>
            <div className={styles.iconWrap}>
              <BellRing size={18} />
            </div>
            <div>
              <p>Уведомления</p>
              <h2>Поставьте галочку, если хотите получать оповещения на почту</h2>
            </div>
          </div>

          <div className={styles.optionList}>
            <label className={styles.optionItem}>
              <div>
                <strong>Email-оповещения по анализам</strong>
                <p>Получать уведомления, когда система находит новые риски по теплице.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    emailAlerts: !prev.emailAlerts,
                  }))
                }
              />
            </label>

            <label className={styles.optionItem}>
              <div>
                <strong>Еженедельная сводка</strong>
                <p>Краткий отчет по активности, качеству снимков и состоянию растений.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    weeklyDigest: !prev.weeklyDigest,
                  }))
                }
              />
            </label>

            <label className={styles.optionItem}>
              <div>
                <strong>Сигналы безопасности</strong>
                <p>Предупреждения о входах в аккаунт и критичных изменениях профиля.</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.securityAlerts}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    securityAlerts: !prev.securityAlerts,
                  }))
                }
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
