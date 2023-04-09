import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UseInfiniteQuery, UseSearchQuery } from "../../services/queries";
import CLoading from "../../components/Loading/Loading";
import CList from "../../components/List/List";
import CForm from "../../components/Form/Form";

const List = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // 무한 스크롤
    const { isFetching, refetch, remove } = UseInfiniteQuery();

    // 검색
    const { isLoading: isSearchLoading } = UseSearchQuery();

    // 상세페이지 이동
    const handleNavigation = (id: string) => {
        navigate(`/${id}`);
    }

    return (
        <>
            {(isFetching || isSearchLoading) && <CLoading />}
            {location.pathname !== '/' ? <Outlet /> : null}

            <div style={{
                display: location.pathname === '/' ? 'block' : 'none'
            }}>
                <CForm remove={remove} refetch={refetch} />
                <CList handleNavigation={handleNavigation} />
            </div>
        </>
    )
};

export default List;
