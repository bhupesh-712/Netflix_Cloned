import { NextPageContext } from 'next';
import {getSession} from 'next-auth/react'
import Navbar from '@/pages/Navbar';
import Billboard from './Billboard';
import MovieList from './MovieList';
import useMovies from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import InfoModal from './InfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
export default function Home() {
  const {data: movies=[]} =useMovies()
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();
  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
    <Navbar/>
    <Billboard />
    <div className='pb-40'>
  <MovieList title='Trending Now' data={movies} />
  <MovieList title="My List" data={favorites} />
    </div>
    </>
  )
}
