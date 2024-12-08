// Tab InterFace
export interface Tab {
    key: string; // 탭의 고유 키
    label: string; // 탭의 표시 라벨
}
export interface TabsProps {
    activeTab: string; // 현재 활성화된 탭의 키
    tabs: Tab[]; // 탭 목록
    onTabChange: (key: string) => void; // 탭 변경 이벤트 핸들러
}