export interface JourneyStep {
  year: string;
  title: string;
  description: string;
  insight: string;
  tags?: string[];
}

export const journey: JourneyStep[] = [
  {
    year: "2021",
    title: "자율주행 구현",
    description:
      "교내 자율주행 경진대회에 참여. 비전 기반 차선 인식·판단·제어를 소형 플랫폼에서 구현. 양측 차선 중앙점 추종의 불안정함을 체감.",
    insight:
      "자율주행에서 핵심은 제어 이전에 '어떤 경로를 어떻게 생성하느냐'라는 생각을 갖게 된 시점",
    tags: ["Vision", "Lane Detection", "Path Planning"],
  },
  {
    year: "2022",
    title: "시스템 사고로의 전환",
    description:
      "자율주행차 연구회 경로생성/판단 파트장. 창작자동차경진대회 은상. 3년간 연구회 대표로 활동하며 교내 자율주행 연구 기반 구축.",
    insight:
      "단순히 기능을 구현하는 것을 넘어, 자율주행 시스템이 어떻게 '판단'해야 하는지에 관심이 확장됨",
    tags: ["Decision Making", "System Design", "Leadership"],
  },
  {
    year: "2023",
    title: "위치추정의 중요성 발견",
    description:
      "한국기계연구원(KIMM) 협업, 현대 자율주행 챌린지 Virtual Track 참가. 강화학습 기반 차량 제어 시도했으나 Localization 문제로 본선 탈락.",
    insight:
      "제어 성능은 결국 정확한 상태 추정에 의해 한계가 결정된다는 점을 체감한 전환점",
    tags: ["SLAM", "Reinforcement Learning", "Localization"],
  },
  {
    year: "2024",
    title: "로보틱스를 거쳐, 다시 실차로",
    description:
      "석사과정 진학 후 SLAM 병렬화 연구. KIMM과 전체 자율주행 SW 아키텍처 설계 참여. 실차 자율주행에 대한 방향 재정비.",
    insight:
      "모듈 단위의 분리보다, 인지–추정–판단–제어가 어떻게 유기적으로 연결되는가에 집중",
    tags: ["E2E", "Architecture", "SLAM Parallelization"],
  },
  {
    year: "2026 ~",
    title: "한양대 AUTO Lab 박사과정",
    description: "Cartopia를 향한 여정이 시작됩니다.",
    insight: "End-to-End 자율주행으로 카토피아 실현",
    tags: ["PhD", "Cartopia", "End-to-End AD"],
  },
];
