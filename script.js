$(document).ready(() => {

    function changeBtn(txt, color, bckColor, selector = $this) {
        $this.html(txt)
        $this.css({
            color: color,
            background: bckColor
        })
    }

    // let interval;
    // function StartButton1(interval) {
    //     this.isRunning = false;
    //     this.isResumed = false;
    //     this.s = 0
    //     this.m = 0
    //     this.h = 0
    //     this.element = $($this)
    //     // this.interval = this.interval
    //     this.intervals = []

    //     this.timerDisplay = function() {

    //         if (this.s < 59) {
    //             this.s++;
    //         } else if (this.m < 59) {
    //             this.s = 0;
    //             this.m++;
    //         } else {
    //             this.h++;
    //         }

    //         this.ss = this.s < 10 ? `0${this.s}` : this.s
    //         this.mm = this.m < 10 ? `0${this.m}` : this.m
    //         this.hh = this.h < 10 ? `0${this.h}` : this.h
    //         this.t = `${this.hh}:${this.mm}:${this.ss}`
    //         console.log(this.t)
    //         // return this.t

    //         this.element.parent().siblings(".time__tracker").find(".timer").html(this
    //             .t)
    //         this.element.siblings(".stop__btn").attr("data-duration", this.t)

    //     }
    //     this.start = function() {
    //         if (!this.isRunning) {
    //             console.log("play")
    //             // this.isRunning = true
    //             this.interval = setInterval(() => {
    //                 this.timerDisplay(this.element)
    //             }, 1000)
    //             console.log(this.interval)
    //         }}
    //         this.pause = function(interval) {
    //         console.log(interval)
    //             this.isRunning = true;
    //             console.log(this.isRunning, !this.isResumed)
    //             if (this.isRunning && !this.isResumed) {
    //                 console.log("paused")
    //                 clearInterval(interval)
    //             }
    //         }
    //         this.resume = function() {
    //             this.isRunning = false;
    //             this.isResumed = true
    //             if (!this.isRunning && this.isResumed) {
    //                 this.isRunning = true;
    //                 this.isResumed = false;

    //                 this.interval = setInterval(() => {
    //                     this.timerDisplay(this.element)
    //                 }, 1000)
    //                 console.log("resumed")
    //             }
    //         }
    // }




    class StartButton {

        constructor() {
            this.element = $($this)
            this.isRunning = false;
            this.isResumed = false;
            this.s = 0;
            this.m = 0;
            this.h = 0;
            this.interval;
        }

        timerDisplay(s, m, h) {

            if (this.s < 59) {
                this.s++;
            } else if (this.m < 59) {
                this.s = 0;
                this.m++;
            } else {
                this.h++;
            }

            this.ss = this.s < 10 ? `0${this.s}` : this.s
            this.mm = this.m < 10 ? `0${this.m}` : this.m
            this.hh = this.h < 10 ? `0${this.h}` : this.h
            this.t = `${this.hh}:${this.mm}:${this.ss}`
            console.log(this.t)

            this.element.parent().siblings(".time__tracker").find(".timer").html(this
                .t)
            this.element.siblings(".stop__btn").attr("data-duration", this.t)

        }
        start() {
            // if (!this.isRunning) {
            // this.isRunning = true
            this.interval = setInterval(() => {
                this.timerDisplay(this.element)
            }, 1000)
            this.element.attr("data-interval", this.interval)
            console.log("started")
            // }
        }
        pause(interval) {
            // this.isRunning = true;
            // console.log(this.isRunning, !this.isResumed)
            // if (this.isRunning && !this.isResumed) {
            clearInterval(interval)
            console.log("paused")
            // }
        }
        resume() {
            //     this.isRunning = false;
            //     this.isResumed = true
            // if (!this.isRunning && this.isResumed) {
            // this.isRunning = true;
            // this.isResumed = false;
            // this.element.
            this.interval = setInterval(() => {
                this.timerDisplay(4, 4, 4)
            }, 1000)
            this.element.attr("data-interval", this.interval)
            console.log("resumed")
            // }
        }
    }

    class StopButton {
        constructor() {
        }
        stop(interval) {
            // if (this.isRunning && !this.isResumed) {
            //     this.isRunning = false;
            //     console.log("ended")
            // }
            clearInterval(interval)
        }
        reset() {
            if (!this.isRunning && !this.isResumed) {
                this.isRunning = false;
                this.isResumed = false;
                console.log("reset")
            }
        }
    }




    $(".start__btn").click(function () {
        $this = $(this);
        let runTimer = new StartButton()
        if ($this.html() == "ابدأ الآن") {
            runTimer.start()


            $this.parent().siblings(".invoice__btn").attr("disabled", "disabled")
            changeBtn("إيقاف", "var(--color-base-1)", "var(--color-turquoise)")
            $this.parent().parent().find(".device__card").addClass("playing")
            startTime = new Date().toLocaleTimeString().slice(0, -3)
            $this.attr("data-start_time", startTime)

        } else if ($this.html() == "إيقاف") {
            let intervID = $this.attr("data-interval")
            console.log(intervID)
            runTimer.pause(intervID)

            let spentTime = $this.siblings(".stop__btn").data("duration")
            changeBtn("استكمال", "var(--color-base-1)", "var(--color-green)")

        } else {
            runTimer.resume()


            changeBtn("إيقاف", "var(--color-base-1)", "var(--color-turquoise)")
        }
    })




    $(".stop__btn").click(function () {
        $this = $(this)

        let stopTimer = new StopButton()

        endTime = new Date().toLocaleTimeString().slice(0, -3)
        $this.attr("data-end_time", endTime)

        if ($this.html() == "إنهاء" && $this.siblings(".start__btn").html() == "ابدأ الآن") {
            let intervID = $this.siblings(".start__btn").attr("data-interval")

            stopTimer.stop(intervID)

            console.log("GoTCHA!")


        } else if ($this.html() == "إنهاء") {
            let intervID = $this.siblings(".start__btn").attr("data-interval")

            stopTimer.stop(intervID)

            $this.siblings(".start__btn").attr("disabled", "disabled").removeClass("floating")

            dur = $this.data("duration")
            dur = $this.parent().siblings(".time__tracker").find(".timer").text()
            console.log(dur)
            $this.parent().siblings(".invoice__btn").find("p").html(dur)
            $this.parent().siblings(".invoice__btn").removeClass(
                "disabled")
            changeBtn("جديد", "var(--color-base-1)", "var(--color-blue)")

            let theStart = $this.siblings(".start__btn").data("start_time")
            $this.parent().siblings(".time__tracker").find(".the__start").html(theStart)
                .fadeIn()
            let theEnd = $this.data("end_time")
            $this.parent().siblings(".time__tracker").find(".the__end").html(theEnd)
                .fadeIn()

        } else {
            changeBtn("إنهاء", "var(--color-base-1)", "var(--color-red)")

            $this.siblings(".start__btn").removeAttr("disabled").addClass("floating")

            $(".the__start, .the__end").html(`00:00:00`).fadeOut()
            $this.parent().parent().find(".time__tracker .timer").html(`00:00:00`)
            $this.parent().parent().find(".invoice .tracked__time ").html(`00:00:00`)

            $this.parent().siblings(".invoice__btn").addClass(
                "disabled")

            $(".start__btn").attr("disabled")
        }

        // changeBtn("ابدأ الآن", "var(--color-base-2)", "var(--color-base-1)", $(".start__btn"))

        $this.siblings(".start__btn").html("ابدأ الآن")
        $(".start__btn").css({
            background: "var(--color-base-1)",
            color: "var(--color-base-2)",
        })
        $this.parent().parent().find(".device__card").removeClass("playing")


    })


    $(".create__invoice_btn").click(function () {
        $(".timer").html(`00:00:00`)
        window.location.open("/owner/invoices/add")

    })




    // ============== API CALL ===========




    $.get(`/v2/api/entity/le_workflow-type-entity-1/list`, data => {

        let allDvc = data.data.map(_ => {
            let dvcName = _.title
            let dvcDesc = _.description
            console.log(dvcName, dvcDesc)

            let dvc =
                `
<div class="device__row d-flex justify-content-around align-items-center" data-device_id="sd">
        <div class=" device__card d-flex flex-column align-items-center">
            <p class="device__name h3 text-center">${dvcName}<span class="h6 mt-1">(${dvcDesc})</span></p>
            <div class="device__avatar text-center">
                <i class="fa-brands fa-playstation"></i>
            </div>
        </div>
        <div class="action__btn d-flex justify-content-around col-3">
            <button class="start__btn bttn start floating" type="button">ابدأ الآن</button>
            <button class="stop__btn bttn stop floating" type="button">إنهاء</button>
        </div>

        <div class="time__tracker">
            <p class="the__start m-0">00:00:00</p>
            <p class="timer m-0">00:00:00</p>
            <p class="the__end m-0">00:00:00</p>
        </div>
        <div class="invoice__btn disabled floating">
            <button class="create__invoice_btn bttn invoice" disabled>
                <a href="/owner/invoices/add" target="_blank">
                    <span>إنشاء فاتورة</span>
                    <p class="tracked__time m-0 p-.4 rounded-1">00:00:00</p>
                </a>
            </button>

        </div>
    </div>
`

            $(".all__devices").append(dvc)
        })

    })



})