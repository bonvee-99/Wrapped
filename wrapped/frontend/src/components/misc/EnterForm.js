import React from 'react'
import './EnterForm.css'

const EnterForm = () => {
    return (
        <>
        <body>
            <div class="enterform">
                <form id="contact" action="">
                    <h4>Enter Your Information</h4>
                        <fieldset>
                            <input placeholder="Your Name" type="text" tabIndex="1" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <input placeholder="Your Email Address" type="email" tabIndex="2" required />
                        </fieldset>
                        <fieldset>
                            <label for="Academic Session">Academic Session: </label>
                                <select name="Academic Session" id="Academic Session">
                                    <option value="2020W">2020W</option>
                                    <option value="2020S">2020S</option>
                                    <option value="2019W">2019W</option>
                                    <option value="2019S">2019S</option>
                                    <option value="2018W">2018W</option>
                                    <option value="2018S">2018S</option>
                                    <option value="2017W">2017W</option>
                                    <option value="2017S">2017S</option>
                                    <option value="2016W">2016W</option>
                                    <option value="2016S">2016S</option>
                                </select>       
                        </fieldset>
                </form>
            </div>
            <div class="enterform">
                <a href="/Results" class="otherButton">See How You Match Up</a>
            </div>
            </body>
        </>
    )
}

export default EnterForm;
