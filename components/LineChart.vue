<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";
export default {
    extends: Line,
    mounted() {
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                label: 'Average Percentage Correct',
                backgroundColor: '#ff000080',
                data: [0, 5, 10, 23, 38, 45, 51, 60, 70, 75, 80, 90]
                }
            ]
        });
    }
}
</script>

<style>

</style>