
  export let colors: any = {
    chartBars : {
      backgroundColor : 'rgb(65, 105, 225 , 0.65)',
      hoverBackgroundColor : '#0000c8',
    },

    dataLabels : {
      color : 'rgb(65, 105, 225 , 0.75)',
    },
  }

  export let pipelineStateColors = {
    successful  : '#4dfdba', // 'green'
    failed      : '#ff4338',     // 'red'
    canceled    : '#aeaeae',   // 'gray'
    skipped     : '#8080ff',    // 'lightBlue'
    running     : '#ffff80',     // 'yellow'
  }


  export let animation = {
    duration : 2000,
    easing : 'easeInOutQuint',
  }


  export let groupNameOfCustomers: string;
  export let groupIndexOfCustomers: number;

  export function setGroupNameOfCustomers(name: string) { groupNameOfCustomers = name }
  export function setGroupIndexOfCustomers(index: number) { groupIndexOfCustomers = index }

