export interface Award {
  title: string;
  organization: string;
  prize: string;
  year: number;
  url?: string;
  videoUrl?: string;
}

export const awards: Award[] = [
  {
    title: "배민 로봇배달 챌린지 자율주행 미션",
    organization: "우아한형제들",
    prize: "2등상(한국로봇산업진흥원장상) + 특별상",
    year: 2024,
    videoUrl: "https://youtu.be/BMznGVwmP94?si=LXZHgfuL6B7NeTAI",
  },
  {
    title: "졸업작품 아이디어 경진대회",
    organization: "KOREATECH",
    prize: "대상",
    year: 2022,
  },
  {
    title: "KSC 한국컴퓨터종합학술대회",
    organization: "한국정보과학회",
    prize: "우수논문상",
    year: 2022,
    url: "https://www.kiise.or.kr/academy/main/main.fa",
  },
  {
    title: "대학생 창작 자동차 경진대회 자율주행 부문",
    organization: "CARSA",
    prize: "은상",
    year: 2022,
    url: "https://carsa.kr/",
  },
];
