// src/app/(dashboard)/parent/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Award,
  BarChart3,
  MessageSquare,
  Download,
  Filter,
  ChevronRight,
  User,
  School,
  Book,
  Target,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { getInitials, formatDate, formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'

// Types based on our Prisma schema
interface Child {
  id: string
  name: string
  studentId: string
  profileImage?: string
  currentClass?: string
  hifzLevel?: string
  attendanceRate: number
  averageGrade: number
  nextClass?: {
    name: string
    time: string
    teacher: string
  }
}

interface AttendanceRecord {
  id: string
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
  className: string
  remarks?: string
}

interface Grade {
  id: string
  subject: string
  examType: string
  score: number
  totalScore: number
  grade: string
  assessedAt: string
  remarks?: string
}

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'LATE'
  marks?: number
  totalMarks: number
}

interface Payment {
  id: string
  description: string
  amount: number
  dueDate: string
  status: 'PENDING' | 'PAID' | 'OVERDUE'
  invoiceUrl?: string
}

interface QuranProgress {
  id: string
  surahName: string
  juzNumber: number
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEWED'
  progress: number
  lastRevised?: string
}

export default function ParentDashboardPage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedChild, setSelectedChild] = useState<string>('')
  const [children, setChildren] = useState<Child[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [quranProgress, setQuranProgress] = useState<QuranProgress[]>([])

  // Fetch parent data
  useEffect(() => {
    const fetchParentData = async () => {
      if (!session?.user?.parentProfile?.id) return
      
      setIsLoading(true)
      try {
        // In production: Replace with actual API calls
        // Mock data for demonstration
        const mockChildren: Child[] = [
          {
            id: '1',
            name: 'Omar Ahmed',
            studentId: 'STD-2024-001',
            profileImage: '',
            currentClass: 'Quran Memorization - Level 1',
            hifzLevel: 'Juz 30',
            attendanceRate: 92,
            averageGrade: 85,
            nextClass: {
              name: 'Quran Class',
              time: 'Today, 2:00 PM',
              teacher: 'Sheikh Ahmed'
            }
          },
          {
            id: '2',
            name: 'Aisha Ahmed',
            studentId: 'STD-2024-002',
            profileImage: '',
            currentClass: 'Fiqh of Worship - Intermediate',
            hifzLevel: 'Juz 25',
            attendanceRate: 96,
            averageGrade: 92,
            nextClass: {
              name: 'Fiqh Class',
              time: 'Tomorrow, 6:00 PM',
              teacher: 'Ustadh Muhammad'
            }
          }
        ]

        const mockAttendance: AttendanceRecord[] = [
          { id: '1', date: '2024-01-15', status: 'PRESENT', className: 'Quran Class' },
          { id: '2', date: '2024-01-14', status: 'PRESENT', className: 'Tajweed Class' },
          { id: '3', date: '2024-01-13', status: 'LATE', className: 'Quran Class', remarks: 'Arrived 10 minutes late' },
          { id: '4', date: '2024-01-12', status: 'ABSENT', className: 'Fiqh Class', remarks: 'Sick leave' },
          { id: '5', date: '2024-01-11', status: 'PRESENT', className: 'Arabic Class' },
        ]

        const mockGrades: Grade[] = [
          { id: '1', subject: 'Quran Memorization', examType: 'Midterm', score: 85, totalScore: 100, grade: 'A-', assessedAt: '2024-01-10', remarks: 'Good memorization' },
          { id: '2', subject: 'Tajweed Rules', examType: 'Quiz', score: 92, totalScore: 100, grade: 'A', assessedAt: '2024-01-08' },
          { id: '3', subject: 'Fiqh of Purification', examType: 'Assignment', score: 78, totalScore: 100, grade: 'B+', assessedAt: '2024-01-05', remarks: 'Needs improvement' },
        ]

        const mockAssignments: Assignment[] = [
          { id: '1', title: 'Memorize Surah An-Naba', subject: 'Quran', dueDate: '2024-01-20', status: 'SUBMITTED', marks: 18, totalMarks: 20 },
          { id: '2', title: 'Fiqh Project - Wudu Steps', subject: 'Fiqh', dueDate: '2024-01-25', status: 'PENDING', totalMarks: 30 },
          { id: '3', title: 'Arabic Vocabulary Quiz', subject: 'Arabic', dueDate: '2024-01-18', status: 'GRADED', marks: 28, totalMarks: 30 },
        ]

        const mockPayments: Payment[] = [
          { id: '1', description: 'January 2024 Tuition', amount: 150, dueDate: '2024-01-31', status: 'PAID', invoiceUrl: '#' },
          { id: '2', description: 'February 2024 Tuition', amount: 150, dueDate: '2024-02-28', status: 'PENDING', invoiceUrl: '#' },
          { id: '3', description: 'Quran Competition Fee', amount: 25, dueDate: '2024-01-20', status: 'OVERDUE', invoiceUrl: '#' },
        ]

        const mockQuranProgress: QuranProgress[] = [
          { id: '1', surahName: 'An-Naba', juzNumber: 30, status: 'COMPLETED', progress: 100, lastRevised: '2024-01-10' },
          { id: '2', surahName: 'An-Naziat', juzNumber: 30, status: 'IN_PROGRESS', progress: 75 },
          { id: '3', surahName: 'Abasa', juzNumber: 30, status: 'NOT_STARTED', progress: 0 },
          { id: '4', surahName: 'At-Takwir', juzNumber: 30, status: 'REVIEWED', progress: 100, lastRevised: '2024-01-12' },
        ]

        setChildren(mockChildren)
        setSelectedChild(mockChildren[0]?.id || '')
        setAttendance(mockAttendance)
        setGrades(mockGrades)
        setAssignments(mockAssignments)
        setPayments(mockPayments)
        setQuranProgress(mockQuranProgress)

      } catch (error) {
        toast.error('Failed to load data', {
          description: 'Please try again later'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchParentData()
  }, [session])

  const selectedChildData = children.find(child => child.id === selectedChild)

  if (status === 'loading' || isLoading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Parent Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor your children&apos;s progress and activities
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <MessageSquare className="h-4 w-4" />
            Message Teachers
          </Button>
        </div>
      </div>

      {/* Children Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">My Children</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select a child to view their details
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Users className="h-4 w-4" />
              {children.length} Children
            </Badge>
          </div>
          
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center space-x-3 rounded-lg border p-4 transition-all hover:shadow-md ${
                  selectedChild === child.id
                    ? 'border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {getInitials(child.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium">{child.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {child.currentClass}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {child.studentId}
                    </Badge>
                    {child.hifzLevel && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Book className="h-3 w-3" />
                        {child.hifzLevel}
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Child Overview */}
      {selectedChildData && (
        <>
          {/* Quick Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Attendance Rate
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedChildData.attendanceRate}%
                    </p>
                    <Progress 
                      value={selectedChildData.attendanceRate} 
                      className="mt-2"
                    />
                  </div>
                  <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Average Grade
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedChildData.averageGrade}%
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Grade:</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {selectedChildData.averageGrade >= 90 ? 'A' :
                         selectedChildData.averageGrade >= 80 ? 'B' :
                         selectedChildData.averageGrade >= 70 ? 'C' : 'D'}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/30">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Next Class
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedChildData.nextClass?.name || 'No upcoming classes'}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {selectedChildData.nextClass?.time || 'Schedule not available'}
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-100 p-3 dark:bg-purple-900/30">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Current Hifz Level
                    </p>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedChildData.hifzLevel || 'Not started'}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Quran Memorization
                    </p>
                  </div>
                  <div className="rounded-lg bg-indigo-100 p-3 dark:bg-indigo-900/30">
                    <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="progress" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="progress">
                <TrendingUp className="mr-2 h-4 w-4" />
                Progress
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <User className="mr-2 h-4 w-4" />
                Attendance
              </TabsTrigger>
              <TabsTrigger value="assignments">
                <FileText className="mr-2 h-4 w-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="payments">
                <DollarSign className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="quran">
                <Book className="mr-2 h-4 w-4" />
                Quran Progress
              </TabsTrigger>
            </TabsList>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Grades Overview */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Academic Performance</CardTitle>
                    <CardDescription>Recent grades and assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {grades.map((grade) => (
                        <div key={grade.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              grade.score >= 90 ? 'bg-green-100 text-green-600' :
                              grade.score >= 80 ? 'bg-blue-100 text-blue-600' :
                              grade.score >= 70 ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              <span className="font-bold">{grade.grade}</span>
                            </div>
                            <div>
                              <p className="font-medium">{grade.subject}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {grade.examType} • {formatDate(grade.assessedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{grade.score}/{grade.totalScore}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {Math.round((grade.score / grade.totalScore) * 100)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`/parent/grades?child=${selectedChild}`}>
                        View All Grades
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Performance Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Overall academic standing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Average</span>
                          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {selectedChildData.averageGrade}%
                          </span>
                        </div>
                        <Progress value={selectedChildData.averageGrade} className="mt-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Subjects Enrolled</span>
                          <span className="font-semibold">4</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Exams Completed</span>
                          <span className="font-semibold">12</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Assignments Pending</span>
                          <span className="font-semibold text-orange-600">2</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Class Rank</span>
                          <span className="font-semibold">#8 of 25</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Attendance Records</CardTitle>
                      <CardDescription>
                        Daily attendance for {selectedChildData.name}
                      </CardDescription>
                    </div>
                    <Badge variant={selectedChildData.attendanceRate >= 90 ? "default" : "destructive"}>
                      {selectedChildData.attendanceRate}% Attendance Rate
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            record.status === 'PRESENT' ? 'bg-green-100 text-green-600' :
                            record.status === 'LATE' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {record.status === 'PRESENT' ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : record.status === 'LATE' ? (
                              <Clock className="h-5 w-5" />
                            ) : (
                              <AlertCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{record.className}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(record.date)}
                            </p>
                            {record.remarks && (
                              <p className="mt-1 text-sm text-gray-500">{record.remarks}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant={
                          record.status === 'PRESENT' ? 'default' :
                          record.status === 'LATE' ? 'secondary' : 'destructive'
                        }>
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`/parent/attendance?child=${selectedChild}`}>
                      View Attendance Calendar
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Assignments & Homework</CardTitle>
                    <CardDescription>Upcoming and completed assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              assignment.status === 'GRADED' ? 'bg-green-100 text-green-600' :
                              assignment.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-600' :
                              assignment.status === 'LATE' ? 'bg-red-100 text-red-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{assignment.title}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{assignment.subject}</span>
                                <span>•</span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  Due: {formatDate(assignment.dueDate)}
                                </span>
                                {assignment.marks && (
                                  <>
                                    <span>•</span>
                                    <span className="font-semibold">
                                      {assignment.marks}/{assignment.totalMarks} marks
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={
                              assignment.status === 'GRADED' ? 'default' :
                              assignment.status === 'SUBMITTED' ? 'secondary' :
                              assignment.status === 'LATE' ? 'destructive' : 'outline'
                            }>
                              {assignment.status}
                            </Badge>
                            {assignment.status === 'PENDING' && (
                              <Button size="sm" variant="outline">
                                Remind Child
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Assignment Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment Overview</CardTitle>
                    <CardDescription>Completion statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Total Assignments</span>
                          <span className="font-semibold">15</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Completed</span>
                          <span className="font-semibold text-green-600">12</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Pending</span>
                          <span className="font-semibold text-yellow-600">2</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Late Submissions</span>
                          <span className="font-semibold text-red-600">1</span>
                        </div>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                        <h4 className="mb-2 font-semibold">Submission Rate</h4>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-2xl font-bold">80%</span>
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <Progress value={80} />
                      </div>

                      <Button className="w-full bg-gradient-primary">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Teacher About Assignments
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>Tuition fees and other payments</CardDescription>
                    </div>
                    <Button className="bg-gradient-primary gap-2">
                      <DollarSign className="h-4 w-4" />
                      Make Payment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            payment.status === 'PAID' ? 'bg-green-100 text-green-600' :
                            payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            <DollarSign className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Due: {formatDate(payment.dueDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                            <Badge variant={
                              payment.status === 'PAID' ? 'default' :
                              payment.status === 'PENDING' ? 'secondary' : 'destructive'
                            }>
                              {payment.status}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            {payment.status === 'PAID' && payment.invoiceUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                                  Invoice
                                </a>
                              </Button>
                            )}
                            {payment.status === 'PENDING' && (
                              <Button size="sm" className="bg-gradient-primary">
                                Pay Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="grid w-full grid-cols-3 gap-4">
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">Paid</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                    <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {formatCurrency(payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">Overdue</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(payments.filter(p => p.status === 'OVERDUE').reduce((sum, p) => sum + p.amount, 0))}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/parent/payments">
                      View Payment Details & History
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Quran Progress Tab */}
            <TabsContent value="quran" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Quran Memorization Progress</CardTitle>
                      <CardDescription>
                        Track {selectedChildData.name}&apos;s Quran memorization journey
                      </CardDescription>
                    </div>
                    <Badge className="gap-1 bg-gradient-primary">
                      <Book className="h-4 w-4" />
                      {selectedChildData.hifzLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <div className="rounded-lg bg-gradient-primary p-6 text-white">
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="text-center">
                          <p className="text-sm opacity-90">Surahs Memorized</p>
                          <p className="mt-2 text-3xl font-bold">
                            {quranProgress.filter(p => p.status === 'COMPLETED' || p.status === 'REVIEWED').length}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm opacity-90">Current Juz</p>
                          <p className="mt-2 text-3xl font-bold">{selectedChildData.hifzLevel}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm opacity-90">Revision Rate</p>
                          <p className="mt-2 text-3xl font-bold">
                            {Math.round((quranProgress.filter(p => p.status === 'REVIEWED').length / quranProgress.length) * 100)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Surah Progress List */}
                    <div className="space-y-4">
                      {quranProgress.map((surah) => (
                        <div key={surah.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                              surah.status === 'COMPLETED' || surah.status === 'REVIEWED' ? 'bg-green-100 text-green-600' :
                              surah.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              <Book className="h-6 w-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{surah.surahName}</p>
                                <Badge variant="outline" className="text-xs">
                                  Juz {surah.juzNumber}
                                </Badge>
                              </div>
                              <div className="mt-2 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-sm">
                                  <Target className="h-4 w-4" />
                                  <span className="capitalize">{surah.status.replace('_', ' ')}</span>
                                </div>
                                {surah.lastRevised && (
                                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                    <Clock className="h-4 w-4" />
                                    Revised: {formatDate(surah.lastRevised)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">{surah.progress}%</span>
                              <Badge variant={
                                surah.status === 'COMPLETED' ? 'default' :
                                surah.status === 'REVIEWED' ? 'secondary' :
                                surah.status === 'IN_PROGRESS' ? 'outline' : 'destructive'
                              }>
                                {surah.status}
                              </Badge>
                            </div>
                            <Progress value={surah.progress} className="w-32" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="grid w-full gap-4 sm:grid-cols-2">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Progress Report
                    </Button>
                    <Button className="gap-2 bg-gradient-primary">
                      <MessageSquare className="h-4 w-4" />
                      Discuss Progress with Teacher
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-6">
              <MessageSquare className="h-6 w-6" />
              <span>Message Teacher</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-6">
              <Calendar className="h-6 w-6" />
              <span>View Schedule</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-6">
              <FileText className="h-6 w-6" />
              <span>Request Report</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-6">
              <Heart className="h-6 w-6" />
              <span>Update Medical Info</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      {/* Children Selection Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}