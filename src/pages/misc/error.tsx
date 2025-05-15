import React from 'react'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

const ErrorFallback: React.FC = () => {
  const error = useRouteError()

  let title = 'เกิดข้อผิดพลาดบางอย่าง'
  let message = 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง'

  if (isRouteErrorResponse(error)) {
    title = `ข้อผิดพลาด ${error.status}`
    message = error.statusText || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <div className="max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">{title}</h1>
        <p className="mb-6">{message}</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>
    </div>
  )
}

export default ErrorFallback
