let value = 0
serial.setBaudRate(BaudRate.BaudRate115200)
if (true) {
    Asr_V3.Asr_Clear_Buffer()
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Set_Mode(Asr_V3.Mode.password_mode)
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(0, "xiao bai")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(1, "kai qi feng shan")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(2, "guan bi feng shan")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(7, "ti gao feng su")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(8, "jiang di feng su")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(9, "wan zuo yi dian")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(9, "wan zuo")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(10, "wan you yi dian")
    Asr_V3.Wait_Asr_Busy()
    Asr_V3.Asr_Add_Words(10, "wan you")
    Asr_V3.Wait_Asr_Busy()
    serial.writeNumber(Asr_V3.Asr_NUM_Cleck())
    Asr_V3.Cleck_Asr_Num(9)
}
Asr_V3.Asr_Gain(85)
Asr_V3.Asr_Set_RGB2(Asr_V3.enColor.White)
Asr_V3.Asr_Buzzer(Asr_V3.Buzzer_State.ON)
basic.pause(1000)
Asr_V3.Asr_Set_RGB2(Asr_V3.enColor.OFF)
Asr_V3.Asr_Buzzer(Asr_V3.Buzzer_State.OFF)
let fan_speed = 500
let steer_angle = 75
CrocoKit_Motor.Servo(AnalogPin.P16, steer_angle)
basic.forever(function () {
    value = Asr_V3.Asr_Result()
    serial.writeNumber(value)
    if (value == 1) {
        CrocoKit_Motor.MotorRun(AnalogPin.P1, fan_speed)
    } else if (value == 2) {
        CrocoKit_Motor.MotorRun(AnalogPin.P1, 0)
    } else if (value == 7) {
        fan_speed += 350
        if (fan_speed > 1023) {
            fan_speed = 1023
        }
        CrocoKit_Motor.MotorRun(AnalogPin.P1, fan_speed)
    } else if (value == 8) {
        fan_speed += -350
        if (fan_speed < 0) {
            fan_speed = 0
        }
        CrocoKit_Motor.MotorRun(AnalogPin.P1, fan_speed)
    } else if (value == 9) {
        steer_angle += -20
        if (steer_angle < 30) {
            steer_angle = 30
        }
        CrocoKit_Motor.Servo(AnalogPin.P16, steer_angle)
    } else if (value == 10) {
        steer_angle += 20
        if (steer_angle > 120) {
            steer_angle = 120
        }
        CrocoKit_Motor.Servo(AnalogPin.P16, steer_angle)
    }
    basic.pause(500)
})
