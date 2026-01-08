// src/app/(dashboard)/teacher/grades/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { 
  Search,
 
  Plus,
  BarChart3,
  TrendingUp,
  TrendingDown,
  
  Download,
  Upload,
  MoreVertical,
  Eye,
  Edit,
  FileText,
  Award,
  Target
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import Link from 'next/link'

interface Grade {
  id: string
  student: {
    id: string
    name: string
    avatar?: string
  }
  class: {
    id: string
    name: string
    code: string
  }
  subject: string
  examType: string
  score: number
  totalScore: number
  percentage: number
  grade: string
  gradePoint: number
  remarks?: string
  gradedAt: string
  gradedBy: string
}

interface GradeSummary {
  classId: string
  className: string
  averageScore: number
  highestScore: number
  lowestScore: number
  totalStudents: number
  gradeDistribution: {
    A: number
    B: number
    C: number
    D: number
    F: number
  }
}

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [gradeSummaries, setGradeSummaries] = useState<GradeSummary[]>([])
  const [filteredGrades, setFilteredGrades] = useState<Grade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [classes, setClasses] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterGrades()
  }, [searchQuery, selectedClass, selectedSubject, grades])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [gradesRes, summariesRes, classesRes, subjectsRes] = await Promise.all([
        fetch('/api/teacher/grades'),
        fetch('/api/teacher/grades/summary'),
        fetch('/api/teacher/classes'),
        fetch('/api/teacher/subjects')
      ])

      if (gradesRes.ok) setGrades(await gradesRes.json())
      if (summariesRes.ok) setGradeSummaries(await summariesRes.json())
      if (classesRes.ok) setClasses(['ALL', ...(await classesRes.json()).map((c: any) => c.name)])
      if (subjectsRes.ok) setSubjects(['ALL', ...(await subjectsRes.json())])
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  const filterGrades = () => {
    let filtered = [...grades]

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(grade =>
        grade.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        grade.examType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by class
    if (selectedClass !== 'ALL') {
      filtered = filtered.filter(grade => grade.class.name === selectedClass)
    }

    // Filter by subject
    if (selectedSubject !== 'ALL') {
      filtered = filtered.filter(grade => grade.subject === selectedSubject)
    }

    setFilteredGrades(filtered)
  }

  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case 'A+':
      case 'A':
      case 'A-':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'B+':
      case 'B':
      case 'B-':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'C+':
      case 'C':
      case 'C-':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'D+':
      case 'D':
      case 'D-':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'F':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Award className="h-4 w-4 text-green-600" />
    if (percentage >= 80) return <TrendingUp className="h-4 w-4 text-blue-600" />
    if (percentage >= 70) return <Target className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  const stats = {
    totalGrades: grades.length,
    averageScore: grades.length > 0 ? grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length : 0,
    topStudent: grades.length > 0 
      ? grades.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current).student.name
      : 'N/A',
    failingStudents: grades.filter(g => g.grade === 'F').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Grades Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            View, manage, and analyze student grades
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button className="bg-gradient-primary gap-2" asChild>
            <Link href="/teacher/grades/add">
              <Plus className="h-4 w-4" />
              Add Grades
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Grades</p>
                <p className="mt-2 text-2xl font-bold text-purple-600">{stats.totalGrades}</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {Math.round(stats.averageScore)}%
                </p>
              </div>
              <div className="rounded-lg bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Student</p>
                <p className="mt-2 text-lg font-bold text-blue-600 truncate">
                  {stats.topStudent}
                </p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failing Students</p>
                <p className="mt-2 text-2xl font-bold text-red-600">{stats.failingStudents}</p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Summary</CardTitle>
          <CardDescription>Overview of grades by class</CardDescription>
        </CardHeader>
        <CardContent>
          {gradeSummaries.length === 0 ? (
            <div className="py-8 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-gray-500">No grade data available</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gradeSummaries.map((summary) => (
                <Card key={summary.classId}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{summary.className}</h3>
                          <p className="text-sm text-gray-500">{summary.totalStudents} students</p>
                        </div>
                        <Badge className="bg-gradient-primary text-white">
                          Avg: {Math.round(summary.averageScore)}%
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Highest</span>
                          <span className="font-bold text-green-600">{summary.highestScore}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Lowest</span>
                          <span className="font-bold text-red-600">{summary.lowestScore}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Grade Distribution</p>
                        <div className="flex h-4 overflow-hidden rounded-full">
                          <div 
                            className="bg-green-500" 
                            style={{ width: `${(summary.gradeDistribution.A / summary.totalStudents) * 100}%` }}
                            title={`A: ${summary.gradeDistribution.A}`}
                          />
                          <div 
                            className="bg-blue-500" 
                            style={{ width: `${(summary.gradeDistribution.B / summary.totalStudents) * 100}%` }}
                            title={`B: ${summary.gradeDistribution.B}`}
                          />
                          <div 
                            className="bg-yellow-500" 
                            style={{ width: `${(summary.gradeDistribution.C / summary.totalStudents) * 100}%` }}
                            title={`C: ${summary.gradeDistribution.C}`}
                          />
                          <div 
                            className="bg-orange-500" 
                            style={{ width: `${(summary.gradeDistribution.D / summary.totalStudents) * 100}%` }}
                            title={`D: ${summary.gradeDistribution.D}`}
                          />
                          <div 
                            className="bg-red-500" 
                            style={{ width: `${(summary.gradeDistribution.F / summary.totalStudents) * 100}%` }}
                            title={`F: ${summary.gradeDistribution.F}`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>A: {summary.gradeDistribution.A}</span>
                          <span>B: {summary.gradeDistribution.B}</span>
                          <span>C: {summary.gradeDistribution.C}</span>
                          <span>D: {summary.gradeDistribution.D}</span>
                          <span>F: {summary.gradeDistribution.F}</span>
                        </div>
                      </div>

                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link href={`/teacher/grades/class/${summary.classId}`}>
                          View Class Grades
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Search Grades</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by student name, subject, or exam type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grades List</CardTitle>
          <CardDescription>
            Showing {filteredGrades.length} of {grades.length} grades
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredGrades.length === 0 ? (
            <div className="py-12 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-semibold">No grades found</h3>
              <p className="mt-2 text-gray-500">
                {searchQuery || selectedClass !== 'ALL' || selectedSubject !== 'ALL'
                  ? 'Try adjusting your search filters'
                  : 'No grades have been entered yet'}
              </p>
              <Button className="mt-4 bg-gradient-primary" asChild>
                <Link href="/teacher/grades/add">
                  Add Grades
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Student</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Class</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Exam</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Grade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Performance</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white">
                            {grade.student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{grade.student.name}</p>
                            <p className="text-sm text-gray-500">ID: {grade.student.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <p className="font-medium">{grade.class.name}</p>
                          <p className="text-sm text-gray-500">{grade.class.code}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant="outline">{grade.subject}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="text-sm font-medium capitalize">{grade.examType}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <p className="font-bold">{grade.score}/{grade.totalScore}</p>
                          <p className="text-sm text-gray-500">{grade.percentage}%</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge className={getGradeColor(grade.grade)}>
                          {grade.grade} ({grade.gradePoint})
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getPerformanceIcon(grade.percentage)}
                          <Progress value={grade.percentage} className="h-2 w-24" />
                          <span className="text-sm font-medium">{grade.percentage}%</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/teacher/grades/${grade.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/teacher/grades/${grade.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/teacher/students/${grade.student.id}/grades`}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Student Report
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Students with highest average scores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from(
              grades.reduce((map, grade) => {
                if (!map.has(grade.student.id)) {
                  map.set(grade.student.id, {
                    student: grade.student,
                    total: 0,
                    count: 0,
                    grades: []
                  })
                }
                const studentData = map.get(grade.student.id)!
                studentData.total += grade.percentage
                studentData.count += 1
                studentData.grades.push(grade)
                return map
              }, new Map())
            )
              .map(([_, data]) => ({
                student: data.student,
                average: data.total / data.count,
                grades: data.grades
              }))
              .sort((a, b) => b.average - a.average)
              .slice(0, 5)
              .map((student, index) => (
                <div key={student.student.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-lg font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{student.student.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{student.grades.length} exams</span>
                        <span>•</span>
                        <span>Best: {Math.max(...student.grades.map(g => g.percentage))}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{Math.round(student.average)}%</p>
                    <Badge className={getGradeColor(
                      student.average >= 90 ? 'A' :
                      student.average >= 80 ? 'B' :
                      student.average >= 70 ? 'C' :
                      student.average >= 60 ? 'D' : 'F'
                    )}>
                      {student.average >= 90 ? 'A' :
                       student.average >= 80 ? 'B' :
                       student.average >= 70 ? 'C' :
                       student.average >= 60 ? 'D' : 'F'}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}