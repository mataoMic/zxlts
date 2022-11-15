import { get, post } from "./http";
import * as _ from "lodash-es";
import { orgnizationOptionFn } from "./pieOptions";
import { catchErrFromArray, getYearAndMonth } from "../../src/utils/common";

export const options = () => {
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let lastYear = new Date().getFullYear() - 1;
  let fiscalYear = parseInt(new Date().getFullYear().toString().substr(2, 4));
  let dateOptions = ["Current Month"];
  for (let i = 1; i <= 2; i++) {
    if (currentMonth < 3) {
      dateOptions.push(currentMonth - i > 0 ? `${currentYear}-${currentMonth - i}`:`${lastYear}-${12- currentMonth - i}`)
    }else {
      dateOptions.push(
        `${currentYear}-${
          (currentMonth - i < 10
            ? "0" + (currentMonth - i)
            : currentMonth - i)
        }`
      );
    }
  }

  // let d = [
  //   "04",
  //   "05",
  //   "06",
  //   "07",
  //   "08",
  //   "09",
  //   "10",
  //   "11",
  //   "12",
  //   "01",
  //   "02",
  //   "03",
  // ];
  // let c: [{}] = [
  //   {
  //     key: "Current Month",
  //     value: [`${currentYear}-${currentMonth}`],
  //   },
  // ];
  // if (currentMonth > 4) {
  //   for (let i = 5; i < currentMonth; i++) {
  //     let reslut = currentYear + "-" + (i + 1 >= 10 ? i + 1 : "0" + i);
  //     b.push(reslut);
  //     c.push({ key: reslut, value: [reslut] });
  //   }
  //   b.push(`FY${currentYear + 1}`);
  //   c.push({
  //     key: `FY${currentYear + 1}`,
  //     value: ((): any => {
  //       let list = [];
  //       for (let i = 5; i < 17; i++) {
  //         list.push(
  //           i > 12
  //             ? `${currentYear}-0${i - 12}`
  //             : `${lastYear}-${i + 1 >= 10 ? i + 1 : "0" + i}`
  //         );
  //       }
  //       return list;
  //     })(),
  //   });
  // }
  // for (let i = 1; i < 5; i++) {
  //   if (!(i === 4 && currentMonth < 5)) {
  //     b.push(`FY${fiscalYear} Q${i}`);
  //     c.push({
  //       key: `FY${fiscalYear} Q${i}`,
  //       value: ``,
  //     });
  //   }
  // }
  // console.log(c);
  // let a = [
  //   "Current Month",
  //   "2022-07",
  //   "2022-06",
  //   "FY2223",
  //   "FY22 Q1",
  //   "FY22 Q2",
  //   "FY22 Q3",
  //   "FY22 Q4",
  // ];
  return dateOptions;
};
export const subTablePieList = {
  subTableList: [
    {
      color: "#438AFF",
      title: "Work tools",
      value: "Email; Calendar; Task; Contacts; IM; Comms",
    },
    {
      color: "#00E489",
      title: "Biz. application",
      value:
        "Approval(18 systems) Time; Vacation; ITPR vendorsmgmt;  Time Entry; IT Support; Monitoring; Dashboard",
    },
    {
      color: "#F8D567",
      title: "Campus service",
      value:
        "Desk & Conference booking; Parking service; Customized facility services",
    },
    {
      color: "#FA9A2E",
      title: "Connection",
      value: "Fitness; Moments; We are Lenovo; Fitness; News",
    },
  ],
};
export const coChatlabels = [
  { title: "Use CoChat" },
  { title: "Not Use CoChat" },
];
export const activelabels = [
  { title: "Active User Data" },
  { title: "Function Reference" },
];
export let orgnizationTextTemplate = [
  {
    title: "Regular Employee",
    background: "linear-gradient(145deg, #438AFF 0%, #49D7FE 100%)",
    number: 24700,
    percentage: "67",
  },
  {
    title: "Vendor",
    background: "linear-gradient(145deg, #89D121 0%, #BDF56B 100%)",
    number: 5161,
    percentage: "14",
  },
  {
    title: "Contractor",
    background: "linear-gradient(145deg, #FC807B 0%, #FCA07E 100%)",
    number: 7005,
    percentage: "26",
  },
];

export const dashboardData = async (params: any) => {
  console.log(params);
  let paramsArr = params.split(',')
  console.log(paramsArr)
  
  if (paramsArr.length > 1 ){
    let start = new Date(parseInt(paramsArr[0])).getFullYear() + '-' +  (new Date(parseInt(paramsArr[0])).getMonth()+1)
    let end = new Date(parseInt(paramsArr[1])).getFullYear() + '-' +  (new Date(parseInt(paramsArr[1])).getMonth()+1)
    paramsArr = start === end ? [start] : getYearAndMonth(start, end)
  }
  console.log(paramsArr)
  const managerDashboard: any = await post(
    "api/ssg-lt/v1/getManagerDashboard",
    paramsArr
  );
  const subordinateDashboard: any = await post(
    "api/ssg-lt/v1/getSubordinateDashboard",
    paramsArr
  );
  catchErrFromArray([managerDashboard, subordinateDashboard]);
  let a = orgnizationTextTemplate.map((item: any) => {
    return {
      title: item.employeeType,
      background: `linear-gradient(145deg, ${
        item.employeeType == "Contractor"
          ? "#FC807B"
          : item.employeeType == "Regular Employee"
          ? "#438AFF"
          : "#89D121"
      } 0%, ${
        item.employeeType == "Contractor"
          ? "#FCA07E"
          : item.employeeType == "Regular Employee"
          ? "#49D7FE"
          : "#BDF56B"
      } 100%)`,
      number: item.totalUser,
      percentage: item.rate * 100,
    };
  });
  if (subordinateDashboard.data.length === 0 || managerDashboard.data.length === 0) {
     return {toast:'No Data'}
  }
  let activeUserSum = 0;
  let totalUserSum = 0;
  managerDashboard.data.forEach((e: any) => {
    activeUserSum += e.activeUser;
    totalUserSum += e.totalUser;
  });
  return {
    managerDashboard,
    orgnizationOption: orgnizationOptionFn(managerDashboard.data),
    orgnizationText: managerDashboard.data.map((item: any) => {
      return {
        title: item.employeeType,
        background: `linear-gradient(145deg, ${
          item.employeeType == "Contractor"
            ? "#FC807B"
            : item.employeeType == "Regular Employee"
            ? "#438AFF"
            : "#89D121"
        } 0%, ${
          item.employeeType == "Contractor"
            ? "#FCA07E"
            : item.employeeType == "Regular Employee"
            ? "#49D7FE"
            : "#BDF56B"
        } 100%)`,
        number: item.activeUser,
        percentage: ((item.activeUser / activeUserSum) * 100).toFixed(2),
      };
    }),
    orgnizationTextList: {
      totalUserSum,
      activeUserSum,
    },
    subordinateDashboard: {
      processList: subordinateDashboard.data.map((item: any) => {
        let processListChildren = [];
        for (const key in item.subordinateDataMap) {
          processListChildren.push({
            label: key,
            value: item.subordinateDataMap[key].rate * 100,
            number: item.subordinateDataMap[key].activeUser,
            progressColor:
              key == "Regular Employee"
                ? "#438AFF"
                : key == "Contarctor"
                ? "#89D121"
                : "#FC817B",
            trackColor:
              key == "Regular Employee"
                ? "#C9E2FF"
                : key == "Contarctor"
                ? "#D4EBB9"
                : "#F7D3D5",
          });
        }
        return {
          label: item.displayName,
          value: item.rate * 100,
          progressColor: "#438AFF",
          children: processListChildren,
          // children: [
          //     _.get(item.subordinateDataMap,'Regular Employee') && {
          //       label: "Regular Employee",
          //       value: item.subordinateDataMap['Regular Employee'].totalUser,
          //       number: item.subordinateDataMap['Regular Employee'].rate * 100,
          //       progressColor: "#438AFF",
          //       trackColor: "#C9E2FF",
          //     },
          //     _.get(item.subordinateDataMap,'Contarctor') && {
          //       label: "Contarctor",
          //       value: item.subordinateDataMap["Contarctor"].totalUser,
          //       number: item.subordinateDataMap["Contarctor"].rate * 100,
          //       progressColor: "#89D121",
          //       trackColor: "#D4EBB9",
          //     },
          //     _.get(item.subordinateDataMap,'Vendor') && {
          //       label: "Vendor",
          //       value: item.subordinateDataMap["Vendor"].totalUser,
          //       number: item.subordinateDataMap["Vendor"].rate * 100,
          //       progressColor: "#FC817B",
          //       trackColor: "#F7D3D5",
          //     },
          // ],
        };
      }),
      tabsList: ["Subordinate", "CoChat Adoption"],
    },
  };
};
