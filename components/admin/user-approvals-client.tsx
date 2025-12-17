// src/components/admin/user-approvals-client.tsx
"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Book,
  GraduationCap,
  User,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { getInitials, formatDate } from '@/lib/utils'

interface UserApprovalsClientProps {
  initialUsers: any[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
  filters: {
    role?: string
    search?: string
    status?: string
  }
}

export default function UserApprovalsClient({ 
  initialUsers, 
  pagination,
  filters 
}: UserApprovalsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [users, setUsers] = useState(initialUsers)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(filters.search || '')
  const [selectedRole, setSelectedRole] = useState(filters.role || 'ALL')
  const [selectedStatus, setSelectedStatus] = useState(filters.status || 'PENDING')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      if (searchQuery) params.set('search', searchQuery)
      if (selectedRole !== 'ALL') params.set('role', selectedRole)
      params.set('status', selectedStatus)
      
      router.push(`/admin/approvals?${params.toString()}`)
      
      // Refetch data
      const response = await fetch(`/api/admin/users/pending?${params.toString()}`)
      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setUsers(initialUsers)
  }, [initialUsers])

  const handleApproveUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to approve user')
      }

      toast.success('User approved successfully', {
        description: 'The user has been approved and notified via email.',
      })

      // Refresh data
      refreshData()
    } catch (error) {
      toast.error('Failed to approve user', {
        description: error instanceof Error ? error.message : 'Please try again.',
      })
    }
  }

  const handleRejectUser = async (userId: string, reason: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rejectionReason: reason }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reject user')
      }

      toast.error('User rejected', {
        description: `User has been rejected: ${reason}`,
      })

      // Refresh data
      refreshData()
    } catch (error) {
      toast.error('Failed to reject user', {
        description: error instanceof Error ? error.message : 'Please try again.',
      })
    }
  }

  const handleBulkApprove = async () => {
    try {
      const userIds = users.map(user => user.id)
      const promises = userIds.map(id => 
        fetch(`/api/admin/users/${id}/approve`, { method: 'POST' })
      )
      
      await Promise.all(promises)
      
      toast.success('Bulk approval completed', {
        description: `${userIds.length} users have been approved.`,
      })

      // Refresh data
      refreshData()
    } catch (error) {
      toast.error('Failed to approve users', {
        description: 'Some users could not be approved.',
      })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    refreshData()
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/approvals?${params.toString()}`)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'TEACHER':
        return <GraduationCap className="h-4 w-4" />
      case 'STUDENT':
        return <Book className="h-4 w-4" />
      case 'PARENT':
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const stats = [
    { label: 'Total Pending', value: pagination.total, color: 'yellow' },
    { 
      label: 'Students', 
      value: users.filter(u => u.role === 'STUDENT').length,
      color: 'blue'
    },
    { 
      label: 'Teachers', 
      value: users.filter(u => u.role === 'TEACHER').length,
      color: 'purple'
    },
    { 
      label: 'Parents', 
      value: users.filter(u => u.role === 'PARENT').length,
      color: 'green'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Approvals
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Review and manage user registration requests
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className