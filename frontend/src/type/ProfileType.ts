export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PRIVATE';

// frontend 전용 genderOption
export const genderOption: Record<Gender, { label: string }> = {
  MALE: { label: '남성' },
  FEMALE: { label: '여성' },
  OTHER: { label: '기타' },
  PRIVATE: { label: '공개 안 함' },
};
