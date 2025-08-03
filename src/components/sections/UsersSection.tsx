import { useState, useEffect, useCallback, memo } from 'react';
import { Button } from '../Button';
import { UserCard } from '../UserCard';
import { fetchUsers } from '../../services/api';
import { User } from '../../types';

interface UsersSectionProps {
  id?: string;
}

function UsersSectionComponent({ id }: UsersSectionProps = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadInitialUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(1, 6);
      setUsers(data.users);
      setTotalPages(data.total_pages);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error('Failed to load initial users', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial users on component mount
  useEffect(() => {
    loadInitialUsers();
    // Reset page to first page whenever UsersSection is refreshed
    setPage(1);
    setHasMore(true);
  }, []);

  const handleShowMore = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const data = await fetchUsers(nextPage, 6);

      // Append new users to existing list
      setUsers(prevUsers => [...prevUsers, ...data.users]);
      setPage(nextPage);
      setHasMore(nextPage < data.total_pages);
    } catch (error) {
      console.error('Failed to load more users', error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page]);

  return (
    <section id={id} className="py-[140px] flex flex-col items-center">
      <div className="flex flex-col items-center gap-[50px] max-w-[1170px] w-full px-4 md:px-8 lg:px-[60px] xl:px-0">
        <h2 className="text-black-87 font-nunito text-[40px] leading-[40px] font-normal text-center">
          Working with GET request
        </h2>

        <div className="w-full ">
          <div className="mb-[50px] grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-4 lg:gap-[29px] justify-items-center ">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              label="Show more"
              onClick={handleShowMore}
              disabled={!hasMore || loading}
              width="w-[120px]"
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Memoize UsersSection to prevent unnecessary re-renders
export const UsersSection = memo(UsersSectionComponent);
