import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />

      {/* 나중에 로그인 후 앱 영역 */}
      {/* <Route path="/app" element={<AppHome />} /> */}
      {/* <Route path="/app/editor/:id?" element={<EditorPage />} /> */}

      {/* 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}