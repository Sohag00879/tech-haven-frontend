import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import { useGetTotalOrdersQuery } from "../../redux/features/order/getTotalOrdersApi";
import { useGetTotalSalesQuery } from "../../redux/features/order/getTotalSalesApi";
import { useGetTotalSalesByDateQuery } from "../../redux/features/order/getTotalSalesByDateApi";
import { useGetUsersQuery } from "../../redux/features/admin/user/getUsersApi";
import AllOrder from "./AllOrder";
import { ApexOptions } from "apexcharts";
import { IoPeopleOutline } from "react-icons/io5";
import { MdFormatListNumbered } from "react-icons/md";
import { IoLogoUsd } from "react-icons/io";

interface ChartState {
  options: ApexOptions;
  series: { name: string; data: number[] }[];
}

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState<ChartState>({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedSalesDate = salesDetail.map((item: any) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            categories: formattedSalesDate.map((item:any) => item.x),
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        series: [{ name: "Sales", data: formattedSalesDate.map((item:any) => item.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap text-white">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
             <IoLogoUsd className="text-2xl"/>
            </div>

            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales?.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
            <IoPeopleOutline className="text-2xl"/>
            </div>

            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              <MdFormatListNumbered className="text-2xl"/>
            </div>

            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
               {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options} // Properly typed options
            series={state.series}
            type="bar"
            width="70%"
          />
        </div>

        <div className="mt-[4rem] mb-5 pr-[2rem]">
          <AllOrder />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
