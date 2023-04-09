import { Outlet, useLocation } from "react-router-dom";
import { UseInfiniteQuery, UseSearchQuery } from "../../services/queries";
import CLoading from "../../components/Loading/Loading";
import CList from "../../components/List/List";
import CForm from "../../components/Form/Form";

const List = () => {
    const location = useLocation();

    // 무한 스크롤
    const { isFetching, refetch, remove } = UseInfiniteQuery();

    // 검색
    const { isLoading: isSearchLoading } = UseSearchQuery();
    return (
        <>
            {(isFetching || isSearchLoading) && <CLoading />}
            {location.pathname !== '/' ? <Outlet /> : null}

            <div style={{
                display: location.pathname === '/' ? 'block' : 'none'
            }}>
                <CForm remove={remove} refetch={refetch} />
                <CList />
            </div>
        </>
    )
};

export default List;
