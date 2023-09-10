import $ from 'react';
// import PageTitle from "../PageTitle"
// import Main from "../../components/parts/Main/Main"
// import LiteHeader from "../../components/parts/Header/LiteHeader/LiteHeader"

interface LayoutProps extends $.ComponentPropsWithoutRef<'div'> {
	children?: $.ReactNode
	pageTitle?: string
}

function LiteLayout({children, pageTitle = ''}: LayoutProps) {

	return (
		<>
			{/* <PageTitle value={pageTitle} />
			<LiteHeader />
			<Main modif='lite'>{children}</Main> */}
		</>
	)
}

export default LiteLayout