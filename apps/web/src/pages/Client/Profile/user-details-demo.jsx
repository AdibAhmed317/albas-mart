import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';

const UserDetailsDemo = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const orders = [
    {
      id: 1,
      date: '2023-06-01',
      items: [
        { name: 'T-Shirt', quantity: 2, price: 29.99 },
        { name: 'Jeans', quantity: 1, price: 59.99 },
      ],
      total: 119.97,
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2023-05-15',
      items: [
        { name: 'Sunglasses', quantity: 1, price: 49.99 },
        { name: 'Beach Towel', quantity: 1, price: 24.99 },
      ],
      total: 74.98,
      status: 'Shipped',
    },
    {
      id: 3,
      date: '2023-04-20',
      items: [{ name: 'Sneakers', quantity: 1, price: 79.99 }],
      total: 79.99,
      status: 'Delivered',
    },
  ];

  const wishlist = [
    {
      id: 1,
      name: 'Cozy Sweater',
      price: 49.99,
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Leather Backpack',
      price: 99.99,
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Floral Dress',
      price: 69.99,
      image: '/placeholder.svg',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-primary text-primary-foreground py-12 px-4 md:px-6'>
        <div className='container mx-auto flex flex-col items-center gap-4'>
          <Avatar className='w-24 h-24 md:w-32 md:h-32'>
            <AvatarImage src='/placeholder-user.jpg' alt='User Avatar' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='text-center'>
            <h1 className='text-2xl font-bold md:text-3xl'>John Doe</h1>
            <p className='text-sm text-muted-foreground md:text-base'>
              Passionate about fashion and exploring new trends.
            </p>
          </div>
        </div>
      </header>
      <main className='container mx-auto py-8 md:py-12'>
        <Tabs
          defaultValue='orders'
          className='w-full'
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className='flex border-b'>
            <TabsTrigger value='orders'>Orders</TabsTrigger>
            <TabsTrigger value='wishlist'>Wishlist</TabsTrigger>
            <TabsTrigger value='settings'>Settings</TabsTrigger>
          </TabsList>
          <TabsContent value='orders'>
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.quantity} x {item.name}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell
                          className={`font-medium ${
                            order.status === 'Delivered'
                              ? 'text-green-500'
                              : 'text-yellow-500'
                          }`}
                        >
                          {order.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='wishlist'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {wishlist.map((item) => (
                <Card key={item.id}>
                  <img
                    src='/placeholder.svg'
                    alt={item.name}
                    width={300}
                    height={300}
                    className='rounded-t-lg object-cover w-full aspect-square'
                  />
                  <CardContent>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold'>{item.name}</h3>
                      <span className='text-primary font-medium'>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-end'>
                      <Button variant='outline' size='sm'>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='settings'>
            <div className='grid gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Name</Label>
                      <Input id='name' defaultValue='John Doe' />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        defaultValue='john.doe@example.com'
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='bio'>Bio</Label>
                      <Textarea
                        id='bio'
                        defaultValue='Passionate about fashion and exploring new trends.'
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your account password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='current-password'>Current Password</Label>
                      <Input id='current-password' type='password' />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='new-password'>New Password</Label>
                      <Input id='new-password' type='password' />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='confirm-password'>Confirm Password</Label>
                      <Input id='confirm-password' type='password' />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button>Change Password</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserDetailsDemo;