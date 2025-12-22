import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button'; 
import { User, UserStats, FilterOptions, SortConfig } from './types';
import AdminSidebar from 'components/admin-components/AdminSidebar';
import AdminHeader from 'components/admin-components/AdminHeader';
import UserStatsCard from './components/UserStatsCard';
import UserFilters from './components/UserFilters';
import BulkActionsBar from './components/BulkActionsBar';
import Icon from 'components/ui/AppIcon';
import UserTableRow from './components/UserTableRow';
import UserProfileModal from './components/UserProfileModal';

const UserManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'registrationDate',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<FilterOptions>({
    accountType: [],
    status: [],
    activityLevel: [],
    verificationStatus: [],
    registrationPeriod: {
      start: null,
      end: null
    }
  });

  const itemsPerPage = 10;

  const mockStats: UserStats = {
    totalUsers: 12847,
    activeUsers: 8932,
    newRegistrations: 342,
    suspendedAccounts: 23,
    verifiedUsers: 9876,
    pendingVerifications: 156
  };

  const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11e8a20a5-1765003605182.png",
    avatarAlt: 'Professional man in blue shirt smiling at camera in office setting',
    accountType: 'trekker',
    registrationDate: new Date('2024-01-15'),
    lastActive: new Date(Date.now() - 3600000),
    status: 'active',
    activityLevel: 'high',
    totalBookings: 12,
    totalReviews: 8,
    totalStories: 5,
    reportCount: 0,
    verificationStatus: 'verified',
    phone: '+977 9841234567',
    location: 'Kathmandu, Nepal',
    joinedFrom: 'Web Application'
  },
  {
    id: '2',
    name: 'Sita Devi Thapa',
    email: 'sita.thapa@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcb90ef0-1765193213696.png",
    avatarAlt: 'Smiling woman in traditional Nepali attire with mountain backdrop',
    accountType: 'guide',
    registrationDate: new Date('2023-11-20'),
    lastActive: new Date(Date.now() - 7200000),
    status: 'active',
    activityLevel: 'high',
    totalBookings: 45,
    totalReviews: 32,
    totalStories: 15,
    reportCount: 0,
    verificationStatus: 'verified',
    phone: '+977 9851234567',
    location: 'Pokhara, Nepal',
    joinedFrom: 'Mobile App'
  },
  {
    id: '3',
    name: 'Bikram Rai',
    email: 'bikram.rai@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10effe447-1764668664976.png",
    avatarAlt: 'Young man in trekking gear with backpack on mountain trail',
    accountType: 'hotel_owner',
    registrationDate: new Date('2024-03-10'),
    lastActive: new Date(Date.now() - 86400000),
    status: 'active',
    activityLevel: 'medium',
    totalBookings: 0,
    totalReviews: 3,
    totalStories: 0,
    reportCount: 0,
    verificationStatus: 'verified',
    phone: '+977 9861234567',
    location: 'Namche Bazaar, Nepal',
    joinedFrom: 'Web Application'
  },
  {
    id: '4',
    name: 'Maya Gurung',
    email: 'maya.gurung@email.com',
    avatar: "https://images.unsplash.com/photo-1618809540654-c62dd2f6336a",
    avatarAlt: 'Woman in red jacket standing near Annapurna mountain range',
    accountType: 'trekker',
    registrationDate: new Date('2024-06-05'),
    lastActive: new Date(Date.now() - 172800000),
    status: 'inactive',
    activityLevel: 'low',
    totalBookings: 2,
    totalReviews: 1,
    totalStories: 0,
    reportCount: 0,
    verificationStatus: 'unverified',
    phone: '+977 9871234567',
    location: 'Lalitpur, Nepal',
    joinedFrom: 'Mobile App'
  },
  {
    id: '5',
    name: 'Anil Tamang',
    email: 'anil.tamang@email.com',
    avatar: "https://images.unsplash.com/photo-1579612769377-72c7703f0604",
    avatarAlt: 'Middle-aged man in traditional Sherpa clothing with prayer flags',
    accountType: 'guide',
    registrationDate: new Date('2023-08-12'),
    lastActive: new Date(Date.now() - 259200000),
    status: 'suspended',
    activityLevel: 'low',
    totalBookings: 28,
    totalReviews: 15,
    totalStories: 8,
    reportCount: 3,
    verificationStatus: 'verified',
    phone: '+977 9881234567',
    location: 'Lukla, Nepal',
    joinedFrom: 'Web Application'
  },
  {
    id: '6',
    name: 'Sunita Magar',
    email: 'sunita.magar@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1246d41fb-1764802362452.png",
    avatarAlt: 'Young woman in hiking attire smiling at Everest Base Camp',
    accountType: 'trekker',
    registrationDate: new Date('2024-09-18'),
    lastActive: new Date(Date.now() - 43200000),
    status: 'active',
    activityLevel: 'medium',
    totalBookings: 5,
    totalReviews: 4,
    totalStories: 2,
    reportCount: 0,
    verificationStatus: 'pending',
    phone: '+977 9891234567',
    location: 'Bhaktapur, Nepal',
    joinedFrom: 'Mobile App'
  },
  {
    id: '7',
    name: 'Deepak Shrestha',
    email: 'deepak.shrestha@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cef39d02-1764768261860.png",
    avatarAlt: 'Professional man in business attire at hotel reception desk',
    accountType: 'hotel_owner',
    registrationDate: new Date('2023-05-22'),
    lastActive: new Date(Date.now() - 10800000),
    status: 'active',
    activityLevel: 'high',
    totalBookings: 0,
    totalReviews: 12,
    totalStories: 0,
    reportCount: 0,
    verificationStatus: 'verified',
    phone: '+977 9801234567',
    location: 'Thamel, Kathmandu',
    joinedFrom: 'Web Application'
  },
  {
    id: '8',
    name: 'Kamala Bhattarai',
    email: 'kamala.bhattarai@email.com',
    avatar: "https://images.unsplash.com/photo-1720873708731-596ff0523d4f",
    avatarAlt: 'Elderly woman in traditional dress with warm smile in village setting',
    accountType: 'trekker',
    registrationDate: new Date('2024-02-28'),
    lastActive: new Date(Date.now() - 604800000),
    status: 'inactive',
    activityLevel: 'low',
    totalBookings: 1,
    totalReviews: 0,
    totalStories: 0,
    reportCount: 0,
    verificationStatus: 'unverified',
    location: 'Chitwan, Nepal',
    joinedFrom: 'Web Application'
  },
  {
    id: '9',
    name: 'Prakash Limbu',
    email: 'prakash.limbu@email.com',
    avatar: "https://images.unsplash.com/photo-1506975395001-4c01f44111e5",
    avatarAlt: 'Athletic man in climbing gear with rope and carabiners on cliff',
    accountType: 'guide',
    registrationDate: new Date('2023-12-05'),
    lastActive: new Date(Date.now() - 14400000),
    status: 'active',
    activityLevel: 'high',
    totalBookings: 38,
    totalReviews: 29,
    totalStories: 12,
    reportCount: 0,
    verificationStatus: 'verified',
    phone: '+977 9811234567',
    location: 'Jiri, Nepal',
    joinedFrom: 'Mobile App'
  },
  {
    id: '10',
    name: 'Anita Karki',
    email: 'anita.karki@email.com',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1648fb963-1766028937047.png",
    avatarAlt: 'Young woman in colorful traditional Nepali dress at cultural festival',
    accountType: 'trekker',
    registrationDate: new Date('2024-07-14'),
    lastActive: new Date(Date.now() - 21600000),
    status: 'pending',
    activityLevel: 'low',
    totalBookings: 0,
    totalReviews: 0,
    totalStories: 0,
    reportCount: 0,
    verificationStatus: 'pending',
    phone: '+977 9821234567',
    location: 'Patan, Nepal',
    joinedFrom: 'Web Application'
  }];


  const filteredUsers = useMemo(() => {
    let result = [...mockUsers];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    if (filters.accountType.length > 0) {
      result = result.filter((user) => filters.accountType.includes(user.accountType));
    }

    if (filters.status.length > 0) {
      result = result.filter((user) => filters.status.includes(user.status));
    }

    if (filters.activityLevel.length > 0) {
      result = result.filter((user) => filters.activityLevel.includes(user.activityLevel));
    }

    if (filters.verificationStatus.length > 0) {
      result = result.filter((user) =>
      filters.verificationStatus.includes(user.verificationStatus)
      );
    }

    if (filters.registrationPeriod.start) {
      result = result.filter(
        (user) => user.registrationDate >= filters.registrationPeriod.start!
      );
    }

    if (filters.registrationPeriod.end) {
      result = result.filter(
        (user) => user.registrationDate <= filters.registrationPeriod.end!
      );
    }

    result.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' ?
        aValue.getTime() - bValue.getTime() :
        bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ?
        aValue.localeCompare(bValue) :
        bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [mockUsers, searchQuery, filters, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSort = (field: keyof User) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
    prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === paginatedUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(paginatedUsers.map((user) => user.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on users:`, selectedUserIds);
    setSelectedUserIds([]);
  };

  const handleStatusChange = (userId: string, status: User['status']) => {
    console.log(`Changing status of user ${userId} to ${status}`);
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, status });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      accountType: [],
      status: [],
      activityLevel: [],
      verificationStatus: [],
      registrationPeriod: {
        start: null,
        end: null
      }
    });
    setSearchQuery('');
  };

  return (
    <>
      <Helmet>
        <title>User Management - Nepal Trek Explorer Admin</title>
        <meta
          name="description"
          content="Manage platform users, track activities, and handle account operations" />

      </Helmet>

      <div className="min-h-screen bg-background">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          userRole="admin" />


        <div className="lg:ml-60">
          <AdminHeader
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            userName="Admin User"
            userRole="Administrator"
            notificationCount={5} />


          <main className="pt-16">
            <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                    User Management
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Manage platform users and track account activities
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                    className="flex-1 sm:flex-initial">

                    Export
                  </Button>
                  <Button
                    variant="default"
                    iconName="UserPlus"
                    iconPosition="left"
                    className="flex-1 sm:flex-initial">

                    Add User
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <UserStatsCard stats={mockStats} />

                <UserFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onSearch={setSearchQuery}
                  searchQuery={searchQuery}
                  onReset={handleResetFilters} />


                <BulkActionsBar
                  selectedCount={selectedUserIds.length}
                  onClearSelection={() => setSelectedUserIds([])}
                  onBulkAction={handleBulkAction} />


                <div className="w-full min-w-0 bg-card border border-border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="hidden lg:table w-full">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="p-4 text-left">
                            <input
                              type="checkbox"
                              checked={
                              selectedUserIds.length === paginatedUsers.length &&
                              paginatedUsers.length > 0
                              }
                              onChange={handleSelectAll}
                              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary" />

                          </th>
                          <th className="p-4 text-left">
                            <button
                              onClick={() => handleSort('name')}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider">

                              User
                              <Icon name="ArrowUpDown" size={14} />
                            </button>
                          </th>
                          <th className="p-4 text-left">
                            <button
                              onClick={() => handleSort('accountType')}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider">

                              Type
                              <Icon name="ArrowUpDown" size={14} />
                            </button>
                          </th>
                          <th className="p-4 text-left">
                            <button
                              onClick={() => handleSort('registrationDate')}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider">

                              Registered
                              <Icon name="ArrowUpDown" size={14} />
                            </button>
                          </th>
                          <th className="p-4 text-left">
                            <button
                              onClick={() => handleSort('lastActive')}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider">

                              Last Active
                              <Icon name="ArrowUpDown" size={14} />
                            </button>
                          </th>
                          <th className="p-4 text-left">
                            <button
                              onClick={() => handleSort('status')}
                              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-smooth caption uppercase tracking-wider">

                              Status
                              <Icon name="ArrowUpDown" size={14} />
                            </button>
                          </th>
                          <th className="p-4 text-left">
                            <span className="text-xs font-medium text-muted-foreground caption uppercase tracking-wider">
                              Activity
                            </span>
                          </th>
                          <th className="p-4 text-left">
                            <span className="text-xs font-medium text-muted-foreground caption uppercase tracking-wider">
                              Verified
                            </span>
                          </th>
                          <th className="p-4 text-left">
                            <span className="text-xs font-medium text-muted-foreground caption uppercase tracking-wider">
                              Reports
                            </span>
                          </th>
                          <th className="p-4 text-left">
                            <span className="text-xs font-medium text-muted-foreground caption uppercase tracking-wider">
                              Actions
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedUsers.map((user) =>
                        <UserTableRow
                          key={user.id}
                          user={user}
                          isSelected={selectedUserIds.includes(user.id)}
                          onSelect={handleSelectUser}
                          onViewProfile={setSelectedUser}
                          onChangeStatus={handleStatusChange} />

                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="lg:hidden space-y-3 p-4">
                    {paginatedUsers.map((user) =>
                    <UserTableRow
                      key={user.id}
                      user={user}
                      isSelected={selectedUserIds.includes(user.id)}
                      onSelect={handleSelectUser}
                      onViewProfile={setSelectedUser}
                      onChangeStatus={handleStatusChange} />

                    )}
                  </div>

                  {filteredUsers.length === 0 &&
                  <div className="text-center py-12">
                      <Icon
                      name="Users"
                      size={48}
                      className="mx-auto mb-4 text-muted-foreground" />

                      <p className="text-lg font-medium text-foreground mb-2">
                        No users found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  }

                  {totalPages > 1 &&
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
                      <p className="text-sm text-muted-foreground caption">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                        {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
                        {filteredUsers.length} users
                      </p>

                      <div className="flex items-center gap-2">
                        <Button
                        variant="outline"
                        size="sm"
                        iconName="ChevronLeft"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} />


                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded transition-smooth ${
                              currentPage === pageNum ?
                              'bg-primary text-primary-foreground' :
                              'text-foreground hover:bg-muted'}`
                              }>

                                {pageNum}
                              </button>);

                        })}
                        </div>

                        <Button
                        variant="outline"
                        size="sm"
                        iconName="ChevronRight"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                        } />

                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </main>
        </div>

        {selectedUser &&
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={handleStatusChange} />

        }
      </div>
    </>);

};

export default UserManagement;