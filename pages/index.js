import Head from "next/Head"
import Login from './login'
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

function Home() {
  return (
    
    <div className="container">
    
    <Head>
        <title>Create Admin Page</title>
        <meta name="description" content="created by team"  />

        <link rel="icon" href="/favicon.ico"/> 
      </Head>
      <Navbar/>
      <a>Admin page</a>  
      <Footer/>
    </div>
  

  )
}
export default Home