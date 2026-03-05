package com.unilink.backend.repository;

import com.unilink.backend.domain.meeting.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // JpaRepository를 상속받으면 save(), findById(), findAll() 같은 기본 기능을 바로 쓸 수 있음
}