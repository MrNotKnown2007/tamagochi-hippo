// app/(tabs)/stats.tsx
import NavigationArrows from '@/components/mini-games/NavigationArrows';
import { ThemedText } from '@/components/themed-text';
import { useHippo } from '@/context/HippoContext';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const statsBg = require('@/screens/stat/stat_background.png');
const titleImg = require('@/models/icons/stats/title.png');
const frameImg = require('@/models/icons/stats/frame.png');
const smallFrame = require('@/models/icons/stats/small_frame.png');
const bigFrame = require('@/models/icons/stats/big frame.png');
const mediumFrame = require('@/models/icons/stats/medium_frame.png');
const rewardsButtonImg = require('@/models/icons/stats/rewards_button.png');
const hippoImg = require('@/models/icons/stats/hippo.png');

// Иконки
const healthIcon = require('@/models/icons/stats/health.png');
const satietyIcon = require('@/models/icons/stats/hunger.png');
const moodIcon = require('@/models/icons/stats/mood.png');
const cleanIcon = require('@/models/icons/stats/clean.png');
const energyIcon = require('@/models/icons/stats/energy.png');
const knowledgeIcon = require('@/models/icons/stats/knowledge.png');
const feedIcon = require('@/models/icons/stats/feed.png');
const playIcon = require('@/models/icons/stats/play.png');
const sleepIcon = require('@/models/icons/stats/sleep.png');
const maleIcon = require('@/models/icons/stats/male.png');
const femaleIcon = require('@/models/icons/stats/female.png');
const moneyIcon = require('@/models/icons/stats/money.png');

// Иконки игр
const bubbleIcon = require('@/models/icons/games/bubble_icon.png');
const cardIcon = require('@/models/icons/games/cards/back.png');
const diceIcon = require('@/models/icons/games/number icon.png');
const brainIcon = require('@/models/icons/games/brain.png');

// Иконка рекорда
const successIcon = require('@/models/icons/stats/succes.png');

// Иконки для модалей
const homeIcon = require('@/models/icons/games/home.png');

export default function StatsScreen() {
    const { hippo } = useHippo();
    const [rewardsModalVisible, setRewardsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    if (!hippo) {
        return <View style={styles.container} />;
    }

    const handlePrevious = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < 2) setCurrentPage(currentPage + 1);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={statsBg} style={styles.background} resizeMode="cover">
                {/* MAIN FRAME WITH ALL CONTENT */}
                <ImageBackground source={frameImg} style={styles.mainFrame} resizeMode="stretch">
                    <View style={styles.frameContent}>
                        {/* PAGE 0: INDICATORS */}
                        {currentPage === 0 && (
                            <View style={styles.pageContainer}>
                                {/* REWARDS BUTTON */}
                                <TouchableOpacity style={styles.rewardsBtnContainer} onPress={() => setRewardsModalVisible(true)}>
                                    <Image source={rewardsButtonImg} style={styles.rewardsBtnImage} resizeMode="contain" />
                                </TouchableOpacity>

                                {/* INFO BOX */}
                                <ImageBackground source={smallFrame} style={styles.infoBox} resizeMode="stretch">
                                    <View style={styles.infoBoxContent}>
                                        <Image source={hippo.gender === 'male' ? maleIcon : femaleIcon} style={styles.genderIcon} resizeMode="contain" />
                                        <ThemedText style={styles.infoText}>{hippo.name}</ThemedText>
                                        <ThemedText style={styles.infoText}>{hippo.age === 'child' ? 'Малыш' : 'Взрослый'}</ThemedText>
                                    </View>
                                </ImageBackground>

                                {/* INDICATORS FRAME */}
                                <ImageBackground source={bigFrame} style={[styles.indicatorsFrame, { padding: screenWidth * 0.03 }]} resizeMode="stretch">
                                    <View style={styles.indicatorsContent}>
                                        <ThemedText style={styles.sectionTitle}>Показатели</ThemedText>
                                        <View style={styles.statsGrid}>
                                            <StatRow icon={healthIcon} label="Здоровье" value={Math.round(hippo.stats.health)} color="#FF6B6B" />
                                            <StatRow icon={satietyIcon} label="Сытость" value={Math.round(hippo.stats.satiety)} color="#FFB84D" />
                                            <StatRow icon={moodIcon} label="Настроение" value={Math.round(hippo.stats.happiness)} color="#4ECDC4" />
                                            <StatRow icon={cleanIcon} label="Чистота" value={Math.round(hippo.stats.cleanliness)} color="#95E1D3" />
                                            <StatRow icon={energyIcon} label="Энергия" value={Math.round(hippo.stats.energy)} color="#FFD966" />
                                            <StatRow icon={knowledgeIcon} label="Жажда" value={Math.round(hippo.stats.thirst)} color="#87CEEB" />
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}

                        {/* PAGE 1: ACTIVITY */}
                        {currentPage === 1 && (
                            <View style={styles.pageContainer}>
                                <ImageBackground source={mediumFrame} style={[styles.activityFrame, { padding: screenWidth * 0.03 }]} resizeMode="stretch">
                                    <View style={styles.activityContent}>
                                        <ThemedText style={styles.sectionTitle}>Активность</ThemedText>
                                        <View style={styles.activityGrid}>
                                            <ActivityRowPage icon={feedIcon} label="Покормлен" value={hippo.feedCount || 0} />
                                            <ActivityRowPage icon={playIcon} label="Поиграл" value={hippo.playCount || 0} />
                                            <ActivityRowPage icon={cleanIcon} label="Помыт" value={hippo.cleanCount || 0} />
                                            <ActivityRowPage icon={sleepIcon} label="Поспал" value={hippo.sleepCount || 0} />
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}

                        {/* PAGE 2: ACHIEVEMENTS */}
                        {currentPage === 2 && (
                            <View style={styles.pageContainer}>
                                <ImageBackground source={bigFrame} style={[styles.achievementsFrame, { padding: screenWidth * 0.03 }]} resizeMode="stretch">
                                    <View style={styles.achievementsContent}>
                                        <ThemedText style={[styles.sectionTitle, { marginTop: -screenHeight * 0.02 }]}>Достижения</ThemedText>
                                        <View style={styles.achievementsGrid}>
                                            <AchievementRowPage icon={bubbleIcon} label="Пузыри" plays={hippo.gameStats.bubbleGamePlays} record={hippo.gameStats.bubbleGameRecord} />
                                            <AchievementRowPage icon={cardIcon} label="Память" plays={hippo.gameStats.memoryGamePlays} />
                                            <AchievementRowPage icon={diceIcon} label="Кубики" plays={hippo.gameStats.thirdGamePlays} />
                                            <AchievementRowPage icon={brainIcon} label="Всего игр" plays={hippo.gameStats.totalGamePlays} />
                                            <AchievementRowPage icon={moneyIcon} label="Заработано" plays={hippo.gameStats.totalCoinsEarned} />
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        )}
                    </View>
                </ImageBackground>

                {/* NAVIGATION ARROWS - BOTTOM */}
                <View style={styles.navigationContainer}>
                    <NavigationArrows
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        canGoPrevious={currentPage > 0}
                        canGoNext={currentPage < 2}
                    />
                </View>

                {/* TITLE - FRONT LAYER */}
                <View style={styles.titleContainer}>
                    <Image source={titleImg} style={styles.title} resizeMode="contain" />
                </View>

                {/* HIPPO - FRONT LAYER */}
                <View style={styles.hippoContainer}>
                    <Image source={hippoImg} style={styles.hippo} resizeMode="contain" />
                </View>
            </ImageBackground>

            {/* REWARDS MODAL */}
            <Modal visible={rewardsModalVisible} transparent animationType="fade" onRequestClose={() => setRewardsModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <ImageBackground source={smallFrame} style={[styles.modalFrame, { width: '100%', aspectRatio: 0.9 }]} resizeMode="stretch">
                        <View style={styles.modalContent}>
                            <ThemedText style={styles.modalTitle}>Награды</ThemedText>
                            <ThemedText style={styles.modalText}>Наград еще нет(((</ThemedText>
                            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setRewardsModalVisible(false)}>
                                <Image source={homeIcon} style={styles.modalCloseIcon} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>
        </View>
    );
}

function StatRow({ icon, label, value, color, scale_size }: any) {
    return (
        <View style={styles.statRow}>
            <Image source={icon} style={styles.rowIcon} />
            <View style={styles.rowInfo}>
                <ThemedText style={styles.rowLabel}>{label}</ThemedText>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: color }]} />
                </View>
            </View>
            <ThemedText style={styles.rowValue}>{value}%</ThemedText>
        </View>
    );
}

function ActivityRowPage({ icon, label, value, scale_size }: any) {
    return (
        <View style={styles.activityRowPage}>
            <Image source={icon} style={styles.actIconPage} />
            <ThemedText style={styles.actLabelPage}>{label}</ThemedText>
            <ThemedText style={styles.actValuePage}>{value}</ThemedText>
        </View>
    );
}

function AchievementRowPage({ icon, label, plays, record }: any) {
    return (
        <>
            <View style={styles.achievementRowPage}>
                <Image source={icon} style={styles.achievementIconPage} />
                <View style={styles.achievementTextContainer}>
                    <ThemedText style={styles.achievementLabelPage}>{label}</ThemedText>
                </View>
                <ThemedText style={styles.achievementValuePage}>{plays}</ThemedText>
            </View>
            {record !== undefined && (
                <View style={styles.achievementRowPage}>
                    <Image source={successIcon} style={styles.achievementIconPage} />
                    <View style={styles.achievementTextContainer}>
                        <ThemedText style={styles.achievementLabelPage}>Рекорд</ThemedText>
                    </View>
                    <ThemedText style={styles.achievementValuePage}>{record}</ThemedText>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    mainFrame: {
        flex: 1,
        marginHorizontal: screenWidth * 0.02,
        marginVertical: -screenHeight * 0.05,
        width: screenWidth,
        height: screenHeight * 0.85,
    },
    frameContent: {
        flex: 1,
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.08,
    },
    pageContainer: {
        flex: 1,
        width: '100%',
    },
    rewardsBtnContainer: {
        alignSelf: 'flex-start',
        marginBottom: screenHeight * 0.04,
    },
    rewardsBtnImage: {
        resizeMode: 'contain',
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        marginTop: screenHeight * 0.02,
        marginLeft: screenWidth * 0.32,
        marginBottom: -screenHeight * 0.07,
    },
    infoBox: {
        justifyContent: 'center',
        height: screenHeight * 0.055,
        width: screenWidth * 0.70,
        marginBottom: screenHeight * 0.01,
        marginLeft: screenHeight * 0.06,
    },
    infoBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.03,
        gap: screenWidth * 0.03,
    },
    genderIcon: {
        resizeMode: 'contain',
        width: screenWidth * 0.07,
        height: screenWidth * 0.07,
    },
    infoText: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.04,
    },
    indicatorsFrame: {
        flex: 1,
        width: screenWidth * 0.72,
        height: screenWidth * 0.7,
        marginBottom: screenHeight * 0.01,
        marginLeft: screenHeight * 0.06,
    },
    indicatorsContent: {
        flex: 1,
    },
    sectionTitle: {
        color: '#FFE4A1',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: screenWidth * 0.04,
        marginBottom: screenHeight * 0.01,
        marginTop: -screenHeight * 0.01,
    },
    statsGrid: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: screenHeight * 0.015,
        gap: screenHeight * 0.005,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: screenWidth * 0.63,
    },
    rowIcon: {
        resizeMode: 'contain',
        width: screenWidth * 0.08,
        height: screenWidth * 0.08,
        marginBottom: -screenHeight * 0.01,
    },
    rowInfo: {
        flex: 1,
        marginHorizontal: screenWidth * 0.02,
    },
    rowLabel: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.025,
        marginBottom: screenHeight * 0.005,
    },
    progressBar: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 2,
        overflow: 'hidden',
        height: screenHeight * 0.008,
    },
    progressFill: {
        height: '100%',
    },
    rowValue: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.025,
        textAlign: 'right',
        minWidth: screenWidth * 0.08,
    },
    activityFrame: {
        width: screenWidth * 0.72,
        height: screenHeight * 0.4,
        marginLeft: screenHeight * 0.06,
        marginTop: screenHeight * 0.08,
    },
    activityContent: {
        flex: 1,
        paddingVertical: screenHeight * 0.02,
    },
    activityGrid: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: screenHeight * 0.015,
        marginTop: screenHeight * 0.01,
    },
    activityRowPage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.02,
    },
    actIconPage: {
        resizeMode: 'contain',
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
    },
    actLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        flex: 1,
        fontSize: screenWidth * 0.035,
        marginHorizontal: screenWidth * 0.02,
    },
    actValuePage: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.04,
        marginRight: screenWidth * 0.02,
    },
    achievementsFrame: {
        width: screenWidth * 0.72,
        height: screenHeight * 0.45,
        marginLeft: screenHeight * 0.06,
        marginTop: screenHeight * 0.08,
    },
    achievementsContent: {
        flex: 1,
        paddingVertical: screenHeight * 0.02,
    },
    achievementsGrid: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: screenHeight * 0.008,
        marginTop: screenHeight * 0.025,
    },
    achievementRowPage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.02,
    },
    achievementIconPage: {
        resizeMode: 'contain',
        width: screenWidth * 0.08,
        height: screenWidth * 0.08,
    },
    achievementTextContainer: {
        flex: 1,
        marginHorizontal: screenWidth * 0.02,
    },
    achievementLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.035,
    },
    achievementValuePage: {
        color: '#1a1a1a',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.04,
        marginRight: screenWidth * 0.02,
    },
    achievementRecordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.02,
    },
    recordIconPage: {
        resizeMode: 'contain',
        width: screenWidth * 0.06,
        height: screenWidth * 0.06,
        marginLeft: screenWidth * 0.02,
    },
    achievementRecordLabelPage: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.035,
    },
    achievementRecordValuePage: {
        color: '#FFD700',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.035,
        marginLeft: screenWidth * 0.01,
        marginRight: screenWidth * 0.02,
    },
    titleContainer: {
        position: 'absolute',
        top: screenHeight * 0.02,
        left: 0,
        right: 0,
        height: screenHeight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        width: '90%',
        resizeMode: 'contain',
    },
    hippoContainer: {
        position: 'absolute',
        bottom: screenHeight * 0.12,
        left: -screenWidth * 0.03,
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        zIndex: 10,
    },
    hippo: {
        resizeMode: 'contain',
        width: screenWidth * 0.59,
        height: screenWidth * 0.59,
    },
    navigationContainer: {
        position: 'absolute',
        bottom: -screenHeight * 0.02,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalFrame: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalTitle: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.06,
    },
    modalText: {
        color: '#7A4A1F',
        fontFamily: 'Comic Sans MS',
        fontSize: screenWidth * 0.04,
    },
    modalCloseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCloseIcon: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
        resizeMode: 'contain',
    },
});
