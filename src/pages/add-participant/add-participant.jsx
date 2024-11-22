import React, { useState } from 'react';
import { participants } from '../../data/participants';

export function AddParticipant() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        physicalTest: {
            colorBlindTest: false,
            longSightednessTest: false,
            astigmatismTest: false,
            responseTest: false,
        },
        theoryTest: {
            trafficSigns: 0,
            roadLines: 0,
            rightOfWay: 0,
        },
        practicalTest: {
            status: false
        }
    });

    const calculatePhysicalTestStatus = (physicalTests) => {
        // Count passed tests
        const passedTests = Object.values(physicalTests).filter(test => test).length;
        // Pass if 3 or more tests are passed
        return passedTests >= 3 ? true : false;
    };

    const calculateTheoryTestStatus = (theoryTests) => {
        const totalScore = 
            parseInt(theoryTests.trafficSigns) +
            parseInt(theoryTests.roadLines) +
            parseInt(theoryTests.rightOfWay);
        const percentageScore = (totalScore / 150) * 100;
        return percentageScore >= 80 ? true : false;
    };

    const calculateFinalStatus = (physicalStatus, theoryStatus, practicalStatus) => {
        
        if (physicalStatus && theoryStatus && practicalStatus) {
            return "ผ่านการทดสอบ";
        }
        
        return "ไม่ผ่านการทดสอบ";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Calculate status for each test
        const physicalStatus = calculatePhysicalTestStatus(formData.physicalTest);
        const theoryStatus = calculateTheoryTestStatus(formData.theoryTest);
        const practicalStatus = formData.practicalTest.status;

        // Calculate total theory score
        const totalTheoryScore = 
            parseInt(formData.theoryTest.trafficSigns) +
            parseInt(formData.theoryTest.roadLines) +
            parseInt(formData.theoryTest.rightOfWay);

        // Create new participant object
        const newParticipant = {
            id: participants.length + 1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            testResults: {
                physicalTest: {
                    ...formData.physicalTest,
                    status: physicalStatus
                },
                theoryTest: {
                    ...formData.theoryTest,
                    totalScore: totalTheoryScore,
                    status: theoryStatus
                },
                practicalTest: {
                    status: practicalStatus
                }
            },
            finalStatus: calculateFinalStatus(physicalStatus, theoryStatus, practicalStatus),
            recordedAt: new Date().toISOString()
        };
        const link = "http://localhost:3001/addParticipant";
        console.log(newParticipant)
        const response = await fetch(link, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newParticipant }),
          });
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const validateTheoryScore = (value) => {
        const num = parseInt(value);
        if (isNaN(num)) return 0;
        if (num < 0) return 0;
        if (num > 50) return 50;
        return num;
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">เพิ่มผู้เข้าทดสอบใหม่</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">ข้อมูลส่วนตัว</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.firstName}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    firstName: e.target.value
                                }))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={formData.lastName}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    lastName: e.target.value
                                }))}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Physical Test */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">การทดสอบร่างกาย</h3>
                        <span className="text-sm text-gray-500">ต้องผ่าน 3 ใน 4 ขั้นตอน</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="colorBlindTest"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.physicalTest.colorBlindTest}
                                onChange={(e) => handleInputChange('physicalTest', 'colorBlindTest', e.target.checked)}
                            />
                            <label htmlFor="colorBlindTest" className="ml-2 text-sm text-gray-700">ทดสอบตาบอดสี</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="longSightednessTest"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.physicalTest.longSightednessTest}
                                onChange={(e) => handleInputChange('physicalTest', 'longSightednessTest', e.target.checked)}
                            />
                            <label htmlFor="longSightednessTest" className="ml-2 text-sm text-gray-700">ทดสอบสายตายาว</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="astigmatismTest"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.physicalTest.astigmatismTest}
                                onChange={(e) => handleInputChange('physicalTest', 'astigmatismTest', e.target.checked)}
                            />
                            <label htmlFor="astigmatismTest" className="ml-2 text-sm text-gray-700">ทดสอบสายตาเอียง</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="responseTest"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.physicalTest.responseTest}
                                onChange={(e) => handleInputChange('physicalTest', 'responseTest', e.target.checked)}
                            />
                            <label htmlFor="responseTest" className="ml-2 text-sm text-gray-700">ทดสอบการตอบสนอง</label>
                        </div>
                    </div>
                </div>

                {/* Theory Test */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">การทดสอบทฤษฎี</h3>
                        <span className="text-sm text-gray-500">ต้องได้คะแนนรวม 80% ขึ้นไป</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ป้ายจราจร (50 คะแนน)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                min="0"
                                max="50"
                                value={formData.theoryTest.trafficSigns}
                                onChange={(e) => handleInputChange('theoryTest', 'trafficSigns', validateTheoryScore(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">เส้นจราจร (50 คะแนน)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                min="0"
                                max="50"
                                value={formData.theoryTest.roadLines}
                                onChange={(e) => handleInputChange('theoryTest', 'roadLines', validateTheoryScore(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">การให้ทาง (50 คะแนน)</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                min="0"
                                max="50"
                                value={formData.theoryTest.rightOfWay}
                                onChange={(e) => handleInputChange('theoryTest', 'rightOfWay', validateTheoryScore(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        คะแนนรวม: {parseInt(formData.theoryTest.trafficSigns) + parseInt(formData.theoryTest.roadLines) + parseInt(formData.theoryTest.rightOfWay)}/150
                    </div>
                </div>

                {/* Practical Test */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">การทดสอบภาคปฏิบัติ</h3>
                    <div>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            value={formData.practicalTest.status}
                            onChange={(e) => handleInputChange('practicalTest', 'status', e.target.value)}
                            required
                        >
                            <option value={false}>ไม่ผ่าน</option>
                            <option value={true}>ผ่าน</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    บันทึกข้อมูล
                </button>
            </form>
        </div>
    );
}