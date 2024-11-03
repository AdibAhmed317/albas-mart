import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import { useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '@/network/request-method';
import Footer from '@/components/footer/footer';
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
import WishListCard from '@/components/profile/wishlist-card';
import NoProductFound from '@/components/shop/no-product-found';
import SkeletonProductCard from '@/components/shop/skeleton-product-card';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const customerId = location.pathname.split('/')[2];
  const [customer, setCustomer] = useState(null);

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const openDeleteModal = () => {
  //   setIsDeleteModalOpen(true);
  // };

  // const closeDeleteModal = () => {
  //   setIsDeleteModalOpen(false);
  // };

  useEffect(() => {
    fetchCustomerDetails();
    fetchWishlistData();
  }, []);

  const fetchWishlistData = async () => {
    setIsLoading(true);
    try {
      const res = await userRequest.get(`wishlist/${customerId}`);

      const productsData = res.data;

      setProducts(productsData);
      setIsLoading(false);
      console.log(productsData);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching wishlist data:', error);
    }
  };

  const fetchCustomerDetails = () => {
    publicRequest
      .get(`user/find/${customerId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  };

  if (!customer) {
    return (
      <div className='h-screen flex items-center justify-center bg-primaryBlue'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col min-h-screen pt-20'>
        <header className='bg-primary text-primary-foreground py-12 px-4 md:px-6'>
          <div className='container mx-auto flex flex-col items-center gap-4'>
            <Avatar className='w-24 h-24 md:w-32 md:h-32'>
              <AvatarImage src='/placeholder-user.jpg' alt='User Avatar' />
              <AvatarFallback className='bg-cyan-500 text-5xl text-black/50'>
                JD
              </AvatarFallback>
            </Avatar>
            <div className='text-center'>
              <h1 className='text-2xl font-bold md:text-3xl'>
                {customer.Name}
              </h1>
              <p className='text-sm text-muted-foreground md:text-base'>
                Mail: {customer.Email}
              </p>
              <p className='text-sm text-muted-foreground md:text-base'>
                id: {customer._id}
              </p>
              <p className='text-sm text-muted-foreground md:text-base'>
                Address: {customer.Address}
              </p>
              <p className='text-sm text-muted-foreground md:text-base'>
                Phone: {customer.Phone}
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
              <div className='overflow-x-auto md:min-h-[60vh] p-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-10'>
                  {isLoading ? (
                    // Show skeletons while loading
                    Array.from({ length: 8 }).map((_, index) => (
                      <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                        <SkeletonProductCard />
                      </div>
                    ))
                  ) : products.length > 0 ? (
                    // If products exist, display them
                    products.some((product) => product.productId.length > 0) ? (
                      products.map((product) => (
                        <React.Fragment key={product._id}>
                          {product.productId.map((productInfo) => (
                            <React.Fragment key={productInfo._id}>
                              <WishListCard product={productInfo} />
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      // If productId arrays are empty
                      <NoProductFound />
                    )
                  ) : (
                    // If no products at all
                    <NoProductFound />
                  )}
                </div>
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
                        <Label htmlFor='current-password'>
                          Current Password
                        </Label>
                        <Input id='current-password' type='password' />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='new-password'>New Password</Label>
                        <Input id='new-password' type='password' />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='confirm-password'>
                          Confirm Password
                        </Label>
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
      <Footer />
    </>
  );
};

export default UserProfile;

// import { motion } from 'framer-motion';
// import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
// import Dropdown from '../../../components/navbar/DropDown';
// import UpdateProfileModal from '../../../components/Modals/UpdateProfileModal';
// import DeleteProfileModal from '../../../components/Modals/DeleteProfileModal';

// {/* <motion.div
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   exit={{ opacity: 0 }}
//   transition={{
//     type: 'keyframes',
//     delay: 0.175,
//   }}
//   className='bg-green-50 flex justify-center items-center min-h-[70vh]'
// >
//   <div className='flex justify-center'>
//     <div className='bg-green-200 shadow-md rounded p-6 max-w-2xl w-full text-green-900'>
//       <h1 className='text-4xl font-thin text-center'>
//         Account Information
//       </h1>
//       <div className='grid grid-cols-2 gap-y-4 text-xl mt-6'>
//         <div className='text-left'>
//           <p className='my-3 text-base'>
//             <strong>Customer ID:</strong>
//           </p>
//           <p className='my-3 text-base'>
//             <strong>Name:</strong>
//           </p>
//           <p className='my-3 text-base'>
//             <strong>Email:</strong>
//           </p>
//           <p className='my-3 text-base'>
//             <strong>Address:</strong>
//           </p>
//           <p className='my-3 text-base'>
//             <strong>Phone:</strong>
//           </p>
//         </div>
//         <div className='text-left overflow-auto'>
//           <p className='my-3 text-base'>{customer._id}</p>
//           <p className='my-3 text-base'>{customer.Name}</p>
//           <p className='my-3 text-base'>{customer.Email}</p>
//           <p className='my-3 text-base'>{customer.Address}</p>
//           <p className='my-3 text-base'>{customer.Phone}</p>
//         </div>
//       </div>
//       <div className='flex gap-1 mt-10'>
//         <button
//           onClick={openModal}
//           className='bg-blue-600 hover:bg-blue-500 transition-all text-white p-2 rounded-lg text-xs'
//         >
//           Update Profile
//         </button>
//         {isModalOpen && (
//           <UpdateProfileModal
//             customer={customer}
//             isOpen={isModalOpen}
//             onClose={closeModal}
//           />
//         )}

//         <button
//           onClick={openDeleteModal}
//           className='bg-red-600 hover:bg-red-500 transition-all text-white p-2 rounded-lg text-xs'
//         >
//           Delete Account
//         </button>
//         {isDeleteModalOpen && (
//           <DeleteProfileModal
//             isOpen={isDeleteModalOpen}
//             onClose={closeDeleteModal}
//             customerId={customer._id}
//           />
//         )}
//       </div>
//     </div>
//   </div>
// </motion.div> */}
