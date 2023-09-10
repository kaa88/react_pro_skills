import $ from 'react';
import { useLocation } from 'react-router-dom';
// import Footer from "../../components/parts/Footer/Footer"
// import Header from "../../components/parts/Header/Header"
// import Main from "../../components/parts/Main/Main"
// import Modal from "../../components/ui/Modal/Modal"
// import PageTitle from "../PageTitle"

interface LayoutProps extends $.ComponentPropsWithoutRef<'div'> {
	children?: $.ReactNode
	pageTitle?: string
}

function DefaultLayout({children, pageTitle = ''}: LayoutProps) {
	let loc = useLocation()
	let page = loc.pathname ? loc.pathname.replace('/', '') : ''

	return (
		<>
			{/* <PageTitle value={pageTitle} />
			<Header />
			<Main page={page}>{children}</Main>
			<Footer />
			<Modal /> */}
		</>
	)
}

export default DefaultLayout