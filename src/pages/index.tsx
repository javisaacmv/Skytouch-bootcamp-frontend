import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { HeaderMenuColored } from "@/components/Header";
import { Box, Loader } from "@mantine/core";
import { TableHotels } from "@/components/Table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  amenities: string[];
}

interface PaginationInfo {
  page: number;
  totalPages: number;
}

export default function Home() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [pageInfo, setPageInfo] = useState<PaginationInfo>({
    page: 1,
    totalPages: 1,
  });
  const [searchByName, setSearchByName] = useState("");

  const router = useRouter();

  const goToEdit = (id: string) => router.push(`/edit/${id}`);

  const getHotels = () => {
    fetch(
      `http://localhost:8080/hotels/paginated?page=${pageInfo.page - 1}${
        searchByName ? `&name=${searchByName}` : ""
      }`,
      {
        mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setHotels(data.hotels);
        setPageInfo({
          page: data.currentPage + 1,
          totalPages: data.totalPages,
        });
      });
  };

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.page, searchByName]);

  const deleteHotel = (id: string) => {
    fetch(`http://localhost:8080/hotels/${id}`, {
      mode: "cors",
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      getHotels();
    });
  };

  return (
    <>
      <Head>
        <title>Bootcamp Hotels</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Head>
        <title>Bootcamp Hotels</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box mx="5rem" h="100%" bg="gray">
          <TableHotels
            setSearchString={setSearchByName}
            searchString={searchByName}
            goToEdit={goToEdit}
            deleteHotel={deleteHotel}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            data={hotels.map((hotel) => ({
              ...hotel,
              rating: hotel.rating?.toString(),
              amenities: hotel.amenities.join(", "),
            }))}
          />
        </Box>
      </main>
    </>
  );
}
