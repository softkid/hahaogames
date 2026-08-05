# HAHAO GAMES MVP PRD (Product Requirements Document)

> **Version:** 0.9 MVP
> **Project:** HAHAO GAMES
> **Service:** [https://hahaogames.com](https://hahaogames.com)
> **Target Launch:** MVP (Cloudflare Pages + Workers)
> **Tech Stack:** React + Hono + Cloudflare + D1

---

# 1. 프로젝트 개요

## Mission

> **"누구나 쉽게 게임을 만들고, 배우고, 함께 성장하는 미래 게임 플랫폼."**

HAHAO GAMES는 단순한 게임 홈페이지가 아니라

- 웹게임 플랫폼
- 게임 제작 플랫폼
- AI 게임 제작 도우미
- 1인 개발자 커뮤니티
- 게임 개발 교육

을 하나의 생태계로 제공한다.

---

# 2. MVP 목표

MVP에서는

**회원가입 → 로그인 → 게임 플레이 → 커뮤니티 → 소개**

까지만 구현한다.

Studio, Academy는 Coming Soon으로 제공한다.

---

# 3. 핵심 KPI

### 회원가입

- Google 로그인 성공률 95%

### 게임

- 첫 게임 실행 30초 이내

### 커뮤니티

- 게시글 작성 가능

### UX

- 첫 화면 로딩 2초 이하

---

# 4. Target User

## Primary

1인 인디 개발자

20~40세

---

## Secondary

게임 개발 입문자

학생

---

## Future

AI 기반 게임 제작자

메타버스 개발자

---

# 5. 사용자 시나리오

## Visitor

```
Landing

↓

서비스 소개

↓

게임 보기

↓

게임 실행

↓

회원가입

↓

커뮤니티
```

---

## Member

```
로그인

↓

프로필

↓

게임 플레이

↓

댓글

↓

좋아요

↓

게시글 작성
```

---

# 6. 사이트맵

```
HAHAO GAMES

Home

Games

Community

About

Team

Login

Profile

Admin
```

---

# 7. Home

Hero

```
Play the Future
```

CTA

```
Play Now

Join Community
```

Sections

```
Featured Games

About

Studio (Coming Soon)

Academy (Coming Soon)

Community Preview

Team
```

---

# 8. Games

목록

```
게임 카드

썸네일

게임명

장르

Play
```

클릭

↓

Popup

↓

iframe 실행

---

게임 데이터

```
Title

Description

Thumbnail

Tags

Path

CreatedAt
```

---

# 9. Community

기능

- 게시글

- 댓글

- 좋아요

- 프로필

게시글

```
제목

내용

작성자

조회수

좋아요

댓글
```

---

# 10. Login

MVP

Google OAuth

```
Google

↓

JWT

↓

Cookie

↓

Profile
```

Future

```
Email

Github

Discord

Google
```

---

# 11. About

회사 소개

Mission

Vision

Roadmap

---

# 12. Team

Sarah

Management

Christopher

Development

Stephanie

Marketing

---

# 13. Profile

프로필 사진

닉네임

가입일

내 글

좋아요

최근 플레이 게임

---

# 14. 관리자

관리자만 접근

기능

게임 등록

게임 수정

게임 삭제

게시글 삭제

회원 관리

---

# 15. MVP 제외

Studio

Academy

AI Builder

Quantum

Metaverse

Marketplace

---

# 16. UI 디자인

스타일

Glassmorphism

Gradient

Glow

Rounded

Dark Theme

Primary

```
Purple
```

Accent

```
Blue

Green

Orange

Red
```

---

# 17. DB

Users

```
id

email

nickname

avatar

provider

created_at
```

---

Games

```
id

title

slug

thumbnail

description

path

created_at
```

---

Posts

```
id

title

content

author_id

created_at
```

---

Comments

```
id

post_id

author_id

content
```

---

Likes

```
id

user_id

post_id
```

---

# 18. API

Auth

```
POST

/auth/google
```

---

User

```
GET

/users/me
```

---

Games

```
GET

/games

GET

/games/:id
```

---

Community

```
GET

/posts

POST

/posts

PUT

/posts/:id

DELETE

/posts/:id
```

---

Comment

```
POST

/comments

DELETE

/comments/:id
```

---

# 19. Cloudflare

```
Cloudflare Pages

↓

React
```

```
Cloudflare Workers

↓

Hono API
```

```
Cloudflare D1
```

```
Cloudflare R2

(이미지 저장)
```

```
Cloudflare KV

(Session Cache)
```

---

# 20. 프로젝트 구조

```
hahaogames/

apps/

    web/

    api/

packages/

    ui/

    shared/

database/

workers/

games/

docs/

README.md

wrangler.toml

package.json
```

---

# 21. MVP 개발 일정 (6주)

| 주차  | 목표                                                    |
| ----- | ------------------------------------------------------- |
| 1주차 | React + Hono + Cloudflare 환경 구축, 디자인 시스템 구성 |
| 2주차 | 메인 페이지, About, Team, 반응형 UI                     |
| 3주차 | Google 로그인, JWT 인증, 사용자 프로필                  |
| 4주차 | 게임 목록, 팝업 실행, 관리자 게임 등록                  |
| 5주차 | 커뮤니티(게시글, 댓글, 좋아요), D1 연동                 |
| 6주차 | 테스트, 성능 최적화, Cloudflare 배포                    |

---

# 22. MVP 성공 기준

### 사용자 경험

- Google 계정으로 1분 이내 가입 및 로그인 가능
- 웹게임을 클릭 한 번으로 팝업에서 실행 가능
- 커뮤니티에서 게시글 작성, 댓글, 좋아요 가능

### 기술

- Cloudflare Pages + Workers 기반 배포 완료
- D1을 이용한 사용자 및 커뮤니티 데이터 관리
- 모바일/태블릿/데스크톱 반응형 지원
- Lighthouse 성능 점수 90점 이상 목표

---

## MVP 이후 로드맵 (Phase 2~4)

### Phase 2

- **Ludara Community** 확장
- 개발자 포트폴리오
- 프로젝트 팀 모집
- 게임 쇼케이스

### Phase 3

- **Studio**
- AI NPC 생성기
- AI 퀘스트 생성기
- AI 맵 생성기
- 게임 템플릿

### Phase 4

- **Academy & Marketplace**
- 게임 개발 강의
- 과제 및 학습 진도
- 에셋 마켓
- AI + 양자 게임 연구소(Quantum Lab)
- 개발자 수익화 및 게임 퍼블리싱

이 PRD는 **"작게 시작해 빠르게 검증하고, 플랫폼으로 확장한다"**는 전략을 기반으로 설계된 HAHAO GAMES의 MVP 문서입니다.
