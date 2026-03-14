export const profile = {
  name: {
    en: "Sangbum Woo",
    ko: "우상범",
    hanja: "㒖相汎",
  },
  title: "PhD Student",
  affiliation: {
    lab: "AUTO Lab",
    university: "Hanyang University",
    department: "미래자동차공학과",
    url: "https://autolab.hanyang.ac.kr/",
  },
  bio: {
    short:
      "Dreaming of Cartopia — a world where every vehicle drives itself.",
    long: `저는 도로 위 모든 차량이 자율주행으로 전환된 '카토피아(Cartopia)'의 실현을 꿈꾸는 연구자입니다.
인간의 인지 메커니즘을 바탕으로, 센서 입력부터 주행 제어까지를 직접 연결하는 End-to-End 자율주행 실차 시스템을 연구하고 있습니다.`,
  },
  researchInterests: [
    "End-to-End Autonomous Driving",
    "SLAM & Localization",
    "Path Planning & Decision Making",
    "Real-car AD ↔ Robotics",
  ],
  social: {
    email: "woosangbyum@naver.com",
    github: "https://github.com/sangbeom0321",
    linkedin: "https://www.linkedin.com/in/woo-247368342/",
    scholar:
      "https://scholar.google.co.kr/citations?user=wiKYF-gAAAAJ&hl=ko",
    orcid: "",
  },
  location: "서울특별시 성동구",
  profileImage: "/images/profile.jpg",
} as const;
