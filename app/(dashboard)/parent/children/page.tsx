// src/app/(dashboard)/parent/children/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  MessageSquare,
  FileText,
  Download,
  Shield,
  Heart,
  Bell,
  Users
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getInitials, formatDate } from '@/lib/utils'
import { toast } from 'sonner'

interface ChildDetail {
  id: string
  name: string
  studentId: string
  dateOfBirth: string
  gender: string
  currentClass: string
  hifzLevel: string
  tajweedLevel: string
  enrollmentDate: string
  emergencyContact: string
  emergencyPhone: string
  medicalNotes?: string
  teacher: {
    name: string
    email: string
    phone: string
    specialization: string
  }
  schedule: Array<{
    day: string
    time: string
    subject: string
    teacher: string
  }>
}

export default function ParentChildrenPage() {
  const { data: session } = useSession()
  const [children, setChildren] = useState<ChildDetail[]>([])
  const [selectedChild, setSelectedChild] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true)
      try {
        // Mock data - Replace with API call
        const mockChildren: ChildDetail[] = [
          {
            id: '1',
            name: 'Omar Ahmed',
            studentId: 'STD-2024-001',
            dateOfBirth: '2010-05-15',
            gender: 'Male',
            currentClass: 'Quran Memorization - Level 1',
            hifzLevel: 'Juz 30',
            tajweedLevel: 'Beginner',
            enrollmentDate: '2024-09-01',
            emergencyContact: 'Ahmed Khan (Father)',
            emergencyPhone: '+971501234567',
            medicalNotes: 'Mild asthma, carries inhaler',
            teacher: {
              name: 'Sheikh Ahmed Al-Qari',
              email: 'quran.teacher@madrasah.com',
              phone: '+966501234567',
              specialization: 'Quran Memorization & Tajweed'
            },
            schedule: [
              { day: 'Monday', time: '9:00 AM - 10:30 AM', subject: 'Quran Memorization', teacher: 'Sheikh Ahmed' },
              { day: 'Wednesday', time: '9:00 AM - 10:30 AM', subject: 'Tajweed Rules', teacher: 'Sheikh Ahmed' },
              { day: 'Friday', time: '2:00 PM - 3:30 PM', subject: 'Islamic Studies', teacher: 'Ustadh Muhammad' },
            ]
          },
          {
            id: '2',
            name: 'Aisha Ahmed',
            studentId: 'STD-2024-002',
            dateOfBirth: '2012-08-20',
            gender: 'Female',
            currentClass: 'Fiqh of Worship - Intermediate',
            hifzLevel: 'Juz 25',
            tajweedLevel: 'Intermediate',
            enrollmentDate: '2024-09-01',
            emergencyContact: 'Ahmed Khan (Father)',
            emergencyPhone: '+971501234567',
            teacher: {
              name: 'Ustadh Muhammad Ali',
              email: 'fiqh.teacher@madrasah.com',
              phone: '+923001234567',
              specialization: 'Fiqh & Islamic Law'
            },
            schedule: [
              { day: 'Tuesday', time: '6:00 PM - 7:30 PM', subject: 'Fiqh of Purification', teacher: 'Ustadh Muhammad' },
              { day: 'Thursday', time: '6:00 PM - 7:30 PM', subject: 'Fiqh of Prayer', teacher: 'Ustadh Muhammad' },
              { day: 'Saturday', time: '10:00 AM - 11:30 AM', subject: 'Arabic Language', teacher: 'Ustadha Fatima' },
            ]
          }
        ]

        setChildren(mockChildren)
        setSelectedChild(mockChildren[0]?.id || '')
      } catch (error) {
        toast.error('Failed to load children data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchChildren()
  }, [])

  const selectedChildData = children.find(child => child.id === selectedChild)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Children</h1>
            <p className="text-gray-600">Manage and monitor your children</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200" />
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="h-96 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Children</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and monitor your children&apos;s information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            Add Another Child
          </Button>
          <Button className="bg-gradient-primary gap-2">
            <Download className="h-4 w-4" />
            Export All Records
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Children List */}
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-lg font-semibold">Select Child</h2>
          <div className="space-y-3">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex w-full items-center space-x-3 rounded-lg border p-4 text-left transition-all hover:shadow-md ${
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
                <div className="flex-1">
                  <p className="font-medium">{child.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {child.currentClass}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {child.studentId}
                    </Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <BookOpen className="h-3 w-3" />
                      {child.hifzLevel}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Children</span>
                  <span className="font-bold">{children.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Classes</span>
                  <span className="font-bold">{new Set(children.map(c => c.currentClass)).size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Teachers</span>
                  <span className="font-bold">{new Set(children.map(c => c.teacher.name)).size}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Child Details */}
        {selectedChildData && (
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="teacher">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Teacher
                </TabsTrigger>
                <TabsTrigger value="medical">
                  <Heart className="mr-2 h-4 w-4" />
                  Medical
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{selectedChildData.name}&apos;s Profile</CardTitle>
                        <CardDescription>
                          Student ID: {selectedChildData.studentId}
                        </CardDescription>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 font-semibold">Basic Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date of Birth</span>
                              <span>{formatDate(selectedChildData.dateOfBirth)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Gender</span>
                              <span>{selectedChildData.gender}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Enrollment Date</span>
                              <span>{formatDate(selectedChildData.enrollmentDate)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 font-semibold">Academic Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current Class</span>
                              <span className="font-medium">{selectedChildData.currentClass}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hifz Level</span>
                              <Badge>{selectedChildData.hifzLevel}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tajweed Level</span>
                              <Badge variant="secondary">{selectedChildData.tajweedLevel}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-2 font-semibold">Emergency Contact</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{selectedChildData.emergencyContact}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{selectedChildData.emergencyPhone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 font-semibold">Quick Actions</h3>
                          <div className="grid gap-2">
                            <Button variant="outline" className="justify-start gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Message Teacher
                            </Button>
                            <Button variant="outline" className="justify-start gap-2">
                              <FileText className="h-4 w-4" />
                              Download Report
                            </Button>
                            <Button variant="outline" className="justify-start gap-2">
                              <Bell className="h-4 w-4" />
                              Set Alerts
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>
                      {selectedChildData.name}&apos;s class timetable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedChildData.schedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{item.subject}</p>
                              <div className="mt-1 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {item.day}
                                </span>
                                <span>•</span>
                                <span>{item.time}</span>
                                <span>•</span>
                                <span>Teacher: {item.teacher}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Join Class
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download Full Schedule (PDF)
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Teacher Tab */}
              <TabsContent value="teacher">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Teacher</CardTitle>
                    <CardDescription>
                      Contact information for {selectedChildData.name}&apos;s teacher
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center rounded-lg border border-gray-200 p-6 dark:border-gray-700 md:flex-row md:items-start md:space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="bg-gradient-primary text-xl text-white">
                          {getInitials(selectedChildData.teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-4 flex-1 space-y-4 md:mt-0">
                        <div>
                          <h3 className="text-xl font-bold">{selectedChildData.teacher.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {selectedChildData.teacher.specialization}
                          </p>
                        </div>
                        
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{selectedChildData.teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{selectedChildData.teacher.phone}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button className="w-full bg-gradient-primary gap-2">
                              <MessageSquare className="h-4 w-4" />
                              Send Message
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                              <Calendar className="h-4 w-4" />
                              Schedule Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Medical Tab */}
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>
                      Important medical details and emergency information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">Medical Notes</h3>
                          <Badge variant="outline" className="gap-1">
                            <Heart className="h-3 w-3" />
                            Medical Info
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {selectedChildData.medicalNotes || 'No medical notes recorded.'}
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          Update Medical Information
                        </Button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <h3 className="mb-2 font-semibold">Emergency Contacts</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Primary Contact</span>
                                <span>{selectedChildData.emergencyContact}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone</span>
                                <span>{selectedChildData.emergencyPhone}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="mb-2 font-semibold">Allergies</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              None recorded
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="mb-2 font-semibold">Medications</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              None recorded
                            </p>
                          </div>

                          <div>
                            <h3 className="mb-2 font-semibold">Special Instructions</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              None recorded
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                        <div className="flex items-start">
                          <Shield className="mr-3 h-5 w-5 text-yellow-600" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">
                              Important Note
                            </h4>
                            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                              Please ensure all medical information is kept up to date.
                              In case of emergency, this information will be shared with
                              teachers and medical personnel.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      Download Medical Form
                    </Button>
                    <Button className="bg-gradient-primary">
                      Update Medical Records
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}