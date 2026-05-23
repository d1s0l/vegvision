import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Droplets,
  Leaf,
  ShieldAlert,
  Thermometer,
} from "lucide-react";
import { AnalysisRow, recentAnalyses } from "@/entities/analysis";
import styles from "./Analiz.module.scss";

const summaryCards = [
  {
    title: "Теплиц в стабильной зоне",
    value: "2 из 4",
    detail: "Основной массив культур развивается без критических отклонений по листу и микроклимату.",
    tone: "good",
  },
  {
    title: "Зон повышенного риска",
    value: "3 сектора",
    detail: "Система фиксирует сочетание высокой влажности, локального перегрева и первых пятен на листе.",
    tone: "warning",
  },
  {
    title: "Критических кейсов",
    value: "1 сектор",
    detail: "Требуется очная проверка агронома и изоляция участка, чтобы не допустить распространения.",
    tone: "critical",
  },
  {
    title: "Камер в онлайне",
    value: "19 из 20",
    detail: "Одна камера в B-04 на диагностике, остальной поток стабилен и участвует в анализе.",
    tone: "neutral",
  },
];

const greenhouseDetails = [
  {
    name: "Теплица A-12",
    status: "Стабильный режим",
    statusTone: "good",
    culture: "Томаты черри",
    temperature: "24°C",
    humidity: "63%",
    cameras: "8 из 8 камер активны",
    overview:
      "Листовая пластина однородная, очагов пятнистости не найдено, динамика по росту ровная. Отклонений по микроклимату нет.",
    risks: [
      "Риск грибкового заражения низкий.",
      "Конденсат в ночной фазе не превышает рабочий порог.",
    ],
    action: "Сохранять текущий режим вентиляции и повторно проверить сектор в стандартном цикле.",
  },
  {
    name: "Теплица B-04",
    status: "Требует внимания",
    statusTone: "warning",
    culture: "Огурец F1",
    temperature: "26°C",
    humidity: "72%",
    cameras: "6 из 7 камер активны",
    overview:
      "Во втором ряду и на среднем ярусе система видит ранние признаки грибкового риска: повышенную влажность, неравномерный цвет листа и локальные светлые пятна.",
    risks: [
      "Вероятность грибкового поражения оценивается как средняя.",
      "Повышенная влажность держится дольше нормы после ночного полива.",
      "Одна камера временно недоступна, поэтому сектор нужно проверить очно.",
    ],
    action: "Сместить ночное проветривание, проверить капельную линию и провести ручной осмотр среднего яруса в секторе B-04.",
  },
  {
    name: "Теплица C-07",
    status: "Критический сигнал",
    statusTone: "critical",
    culture: "Базилик",
    temperature: "22°C",
    humidity: "58%",
    cameras: "5 из 5 камер активны",
    overview:
      "На части листьев найдены выраженные признаки бактериальной пятнистости. Паттерн повторяется в нескольких кадрах и не похож на единичный артефакт съемки.",
    risks: [
      "Высокая вероятность локального распространения по соседним растениям.",
      "Есть риск потери части урожая в течение ближайших циклов без быстрого вмешательства.",
    ],
    action: "Изолировать проблемный ряд, отправить агронома на очную верификацию и подготовить сценарий точечной обработки.",
  },
];

const factorCards = [
  {
    icon: Droplets,
    title: "Влажность выше нормы",
    description:
      "Главный фактор риска сейчас сосредоточен в B-04: влажность держится на уровне 72%, из-за чего лист дольше остается в зоне возможного грибкового развития.",
  },
  {
    icon: Thermometer,
    title: "Локальный перегрев",
    description:
      "Повышение температуры до 26°C само по себе не критично, но в связке с влажностью усиливает нагрузку на огуречный сектор и ускоряет стрессовые реакции.",
  },
  {
    icon: Camera,
    title: "Неполный видеоохват",
    description:
      "Одна камера в B-04 находится на диагностике, поэтому для полной картины система рекомендует не полагаться только на автоматический сигнал и дойти до сектора вручную.",
  },
];

const actionPlan = [
  {
    title: "Приоритет 1: сектор C-07",
    detail:
      "Проверить очаг бактериальной пятнистости, локализовать ряд и зафиксировать визуальный статус соседних растений.",
  },
  {
    title: "Приоритет 2: сектор B-04",
    detail:
      "Снизить влажность в ночном окне, проверить проветривание и пересмотреть график полива на ближайший цикл.",
  },
  {
    title: "Приоритет 3: диагностика камеры",
    detail:
      "Вернуть в строй седьмую камеру B-04, чтобы система снова собирала полную картину без слепой зоны.",
  },
];

interface AnalizProps {
  dashboardHref?: string;
}

export function Analiz({ dashboardHref = "/" }: AnalizProps) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.badge}>
            <Leaf size={16} />
            <span>Подробный анализ теплиц</span>
          </div>
          <h1>Что прямо сейчас происходит в теплицах</h1>
          <p>
            По текущему ML-мониторингу основная масса растений остается в
            стабильной зоне, но B-04 и C-07 уже требуют разных сценариев
            вмешательства. Ниже собрана детальная картина: где именно растет
            риск, что стало причиной и какие действия нужны команде в первую
            очередь.
          </p>
        </div>

        <Link href={dashboardHref} className={styles.heroLink}>
          Вернуться к дашборду
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className={styles.summaryGrid}>
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className={`${styles.summaryCard} ${styles[card.tone]}`}
          >
            <p>{card.title}</p>
            <strong>{card.value}</strong>
            <span>{card.detail}</span>
          </article>
        ))}
      </section>

      <section className={styles.mainGrid}>
        <article className={styles.sectionCard}>
          <div className={styles.sectionHead}>
            <p>Разбор по теплицам</p>
            <h2>Подробная ситуация по каждому активному блоку</h2>
          </div>

          <div className={styles.greenhouseList}>
            {greenhouseDetails.map((item) => (
              <article key={item.name} className={styles.greenhouseCard}>
                <div className={styles.greenhouseTop}>
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.culture}</span>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${styles[item.statusTone]}`}
                  >
                    {item.statusTone === "good" && <CheckCircle2 size={16} />}
                    {item.statusTone === "warning" && <AlertTriangle size={16} />}
                    {item.statusTone === "critical" && <ShieldAlert size={16} />}
                    {item.status}
                  </span>
                </div>

                <div className={styles.metricRow}>
                  <div>
                    <span>Температура</span>
                    <strong>{item.temperature}</strong>
                  </div>
                  <div>
                    <span>Влажность</span>
                    <strong>{item.humidity}</strong>
                  </div>
                  <div>
                    <span>Камеры</span>
                    <strong>{item.cameras}</strong>
                  </div>
                </div>

                <p className={styles.overview}>{item.overview}</p>

                <div className={styles.subBlock}>
                  <h4>Что насторожило систему</h4>
                  <ul className={styles.bulletList}>
                    {item.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.subBlock}>
                  <h4>Рекомендуемое действие</h4>
                  <p>{item.action}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <div className={styles.sideColumn}>
          <article className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <p>Ключевые факторы</p>
              <h2>Почему система подняла эти сигналы</h2>
            </div>

            <div className={styles.factorList}>
              {factorCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className={styles.factorCard}>
                    <div className={styles.iconWrap}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <p>План для команды</p>
              <h2>Что сделать в ближайший обход</h2>
            </div>

            <div className={styles.planList}>
              {actionPlan.map((item, index) => (
                <div key={item.title} className={styles.planItem}>
                  <span className={styles.planIndex}>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.sectionCard}>
        <div className={styles.sectionHead}>
          <p>Последние срабатывания</p>
          <h2>Лента недавних анализов по культурам и секторам</h2>
        </div>

        <div className={styles.analysisList}>
          {recentAnalyses.map((analysis) => (
            <AnalysisRow key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </section>
    </div>
  );
}
