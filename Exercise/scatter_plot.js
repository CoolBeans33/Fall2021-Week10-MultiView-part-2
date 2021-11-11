function scatter_plot(X,Y,markersize,
                      ColorData,
                      axis_key,
                      title="",
                      xLabel="",
                      yLabel="",
                      margin = 100)
{
    function data_axis_pad(data,pad=.05){
        return [data[0]-pad*data[0], data[1]+pad*data[1] ]
    }

    let xScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(X))).range([0+margin,1000-margin])
    let yScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(Y))).range([1000-margin,0 + margin])
    let colorScale= d3.scaleLinear().domain(d3.extent(ColorData)).range(['steelblue','brown'])
    let axis = d3.select(`#${axis_key}`)

    axis.selectAll('.markers')
        .data(X)
        .enter()
        .append('g')
        .attr('transform', function(d,i) {
            return `translate(${xScale(X[i])}, ${yScale(Y[i])})`})
        .append('circle')
        .attr("class",function (d,i){
            return `cls_${i}`})
        .attr("r",markersize)
        .style("fill",function (d,i)
            {
                if(ColorData[i] == 0)
                {
                    return "#a52a2a"
                }
                if(ColorData[i] == 1)
                {
                    return "#4682b4"
                }
                if(ColorData[i] == 2)
                {
                    return "#76566f"
                }
            })
        .on("mouseenter",function (){
            let mouse_selected_element_class=d3.select(this).attr('class')
            d3.selectAll(`circle`).classed("highlighted",false).attr("r",markersize)
            d3.selectAll(`.${mouse_selected_element_class}`)
                .classed("highlighted",true)
                .transition()
                .duration(1000)
                .ease(d3.easeBounceOut)
                .attr("r",markersize*4)
        })
        .on("mouseleave",function(){
            d3.selectAll(`circle`).classed("highlighted",false).transition().duration(1000).ease(d3.easeBounceOut).attr("r",markersize)
        })

    // x and y Axis function
    let x_axis = d3.axisBottom(xScale).ticks(4)
    let y_axis = d3.axisLeft(yScale).ticks(4) 
    //X Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${1000-margin})`)
        .call(x_axis)
    // Y Axis
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${margin},${0})`)
        .call(y_axis)
    // Labels
    axis.append("g").attr("class","label")
        .attr("transform", `translate(${500},${1000-10})`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(xLabel)

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(yLabel)

    // Title
    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","plotTitle")

    console.log(ColorData)
    // Handmade legend
    axis.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#a52a2a")
    axis.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#4682b4")
    axis.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#76566f")
    axis.append("text").attr("x", 220).attr("y", 135).text("Torgersen").style("font-size", "15px").attr("alignment-baseline","top")
    axis.append("text").attr("x", 220).attr("y", 160).text("Biscoe").style("font-size", "15px").attr("alignment-baseline","middle")
    axis.append("text").attr("x", 220).attr("y", 195).text("Dream").style("font-size", "15px").attr("alignment-baseline","bottom")

}