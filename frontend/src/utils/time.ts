/**
 * 목표 시간(targetDateString)까지 남은 시간을 계산하여 문자열로 반환합니다.
 * @param targetDateString 백엔드에서 받은 시간 문자열 (예: '2026-03-12T23:59:59Z')
 * @returns 'O일', 'O시간', 'O분', 또는 '마감됨'
 */
export const getRemainingTime = (targetDateString: string): string => {
  const now = new Date();
  const target = new Date(targetDateString);

  // 목표 시간에서 현재 시간을 뺌 (밀리초 단위)
  const diffMs = target.getTime() - now.getTime();

  // 1. 이미 시간이 지났거나 마감된 경우
  if (diffMs <= 0) {
    return '마감됨';
  }

  // 밀리초(ms)를 일, 시간, 분 단위로 변환
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 2. 가장 큰 단위부터 확인하여 반환
  if (diffDays > 0) {
    return `${diffDays}일`;
  }

  if (diffHours > 0) {
    return `${diffHours}시간`;
  }

  if (diffMinutes > 0) {
    return `${diffMinutes}분`;
  }

  // 1분 미만으로 남았을 경우
  return '방금 전';
};
